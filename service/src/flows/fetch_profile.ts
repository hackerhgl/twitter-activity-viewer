import { getReduxDump } from 'utils/puppeteer';
import { fields } from 'static/fields';
import { loadJsonFile } from 'utils';
import { type Tweet } from 'types/tweet';
import { type Page } from 'puppeteer';

async function getReduxProfilesDump(page: Page) {
    try {
        const state = await getReduxDump(page);
        const users = state.entities.users.entities;
        return users;
    } catch (error) {
        console.log('Error in getReduxTweetsDump');
        console.log(error);
    }
}

async function fetchProfile(page: Page, username: string) {
    try {
        await page.goto('https://twitter.com/' + username, {
            waitUntil: 'networkidle2',
        });
        await page.waitForSelector(fields.tweet.base);
        const data = await getReduxProfilesDump(page);
        return data;
    } catch (e) {
        console.log('Error in likedTweets');
        console.log(e);
    }
}

export async function fetchProfilesFromTweets(page: Page) {
    try {
        const tweets = loadJsonFile<Tweet[]>('tweets');
        if (!tweets) {
            throw new Error('No tweets found');
        }
        const profiles = new Set<any>();
        for (let i = 0; i < tweets.length; i++) {
            const tweet = tweets[i];
            const profile = await fetchProfile(page, tweet.user);
            profiles.add(profile);
        }
        return profiles;
    } catch (e) {
        console.log('Error in fetchProfilesFromTweets');
        console.log(e);
    }
}
