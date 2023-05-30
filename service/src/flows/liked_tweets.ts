import { fields } from 'static/fields';
import { sleep, writeJsonFile } from 'utils';
import { getReduxDump } from 'utils/puppeteer';
import { type Page } from 'puppeteer';
import { type Tweet } from 'types/tweet';
import { type TwitterUser } from 'types/user';

async function scrollToBottom(page: Page) {
    try {
        await page.evaluate(async () => {
            const scrollHeight = document.body.scrollHeight;
            scrollTo(0, scrollHeight);
        });
    } catch (error) {
        console.log('Error in scrollToBottom');
        console.log(error);
    }
}

async function scrollAndWait(page: Page) {
    try {
        await scrollToBottom(page);
        // await page.waitForSelector(fields.loader);
        await page.waitForNetworkIdle(); // Experimental
        await scrollToBottom(page);
        await sleep(1000);
    } catch (error) {
        console.log('Error in scrollAndWait');
        console.log(error);
    }
}

async function getReduxParsedDump(page: Page) {
    try {
        const state = await getReduxDump(page);
        const tweets: Tweet[] = Object.values(state.entities.tweets.entities);
        const users: TwitterUser[] = state.entities.users.entities;
        return { tweets, users };
    } catch (error) {
        console.log('Error in getReduxTweetsDump');
        console.log(error);
    }
}

export async function flowFetchLikedTweets(page: Page) {
    try {
        await page.goto('https://twitter.com/hackerhgl/likes', {
            waitUntil: 'networkidle2',
        });
        await page.waitForSelector(fields.tweet.base);

        let tweets: Tweet[] = [];
        const repeatAmount = 5;
        let repeated = 0;

        while (true) {
            console.log('while loop | repeated', repeated);
            const data = await getReduxParsedDump(page);
            if (!data?.tweets?.length) break;
            const isEqualTweets = data.tweets.length === tweets.length;
            console.log(
                'while loop | data',
                data.tweets.length,
                'tweets:',
                tweets.length,
            );
            if (isEqualTweets && repeated < repeatAmount) {
                repeated++;
            }
            if (!isEqualTweets) {
                repeated = 0;
            }
            // If the tweets are the same and we have repeated the same amount of times, we can break the loop
            if (isEqualTweets && repeated >= repeatAmount) {
                break;
            }
            tweets = [...data.tweets];
            await scrollAndWait(page);

            writeJsonFile('users', JSON.stringify(data.users, null, 2));
            writeJsonFile('tweets', JSON.stringify(tweets, null, 2));
        }
        console.log('while loop | done');
        await page.close();
        process.exit(0);
    } catch (e) {
        console.log('Error in likedTweets');
        console.log(e);
    }
}
