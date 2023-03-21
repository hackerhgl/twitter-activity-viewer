const { fields } = require('./fields');
const fs  = require('fs');
const { sleep, getReduxDump } = require('./utils');

async function scrollToBottom(page) {
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

async function scrollAndWait(page) {
    try {
        await scrollToBottom(page);
        await page.waitForSelector(fields.loader);
        page.waitForFunction(() => !document.querySelector(fields.loader))
        await scrollToBottom(page);
        await sleep(1000);

    } catch (error) {
        console.log('Error in scrollAndWait');
        console.log(error);
    }
}

async function getReduxTweetsDump(page) {
    try {
        const state = await getReduxDump(page);
        const tweets = state.entities.tweets.entities;
        const parsed = Object.values(tweets);
        return parsed;
    } catch (error) {
        console.log('Error in getReduxTweetsDump');
        console.log(error);
    }
}

async function likedTweets(page) {
    try {
        await page.goto('https://twitter.com/hackerhgl/likes', { waitUntil: 'networkidle2' })
        page.setDefaultNavigationTimeout(0); 
        page.setDefaultTimeout(0)
        await page.waitForSelector(fields.tweet.base)
   

        let tweets = [];
        const repeatAmount = 5;
        let repeated = 0;

        while (true) {
            const data = await getReduxTweetsDump(page);
            if (data.length === tweets.length && repeated < repeatAmount) {
                repeated++;
                continue;
            }
            if (data.length === tweets.length && repeated >= repeatAmount) {
                break;
            }
            repeated = 0;
            tweets = [...data];
            await scrollAndWait(page);
            fs.writeFileSync('data.json', JSON.stringify(tweets, null, 2));
        }
    } catch (e) {
        console.log("Error in likedTweets");
        console.log(e);
    }
    
}