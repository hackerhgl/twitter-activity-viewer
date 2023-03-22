const { getReduxDump } = require('./utils');
const { fields } = require('./fields');
const tweets = require('./data.json');

async function getReduxUsersDump(page) {
    try {
        const state = await getReduxDump(page);
        const users = state.entities.users.entities;
        // const parsed = Object.values(tweets);
        return users;
    } catch (error) {
        console.log('Error in getReduxTweetsDump');
        console.log(error);
    }
}

async function fetchProfile(page, username) {
    try {
        await page.goto('https://twitter.com/' + username , { waitUntil: 'networkidle2' })
        await page.waitForSelector(fields.tweet.base);
        const data = await getReduxUsersDump(page);
        return data;
    } catch (e) {
        console.log("Error in likedTweets");
        console.log(e);
    }   
}

async function fetchProfilesFromTweets(page) {
    try {
        const profiles = new Set();
        for (let i = 0; i < tweets.length; i++) {
            const tweet = tweets[i];
            const profile = await fetchProfile(page, tweet.user);
            profiles.push(profile);
        }
        return profiles;
    } catch (e) {
        console.log("Error in fetchProfilesFromTweets");
        console.log(e);
    }
}


module.exports = { fetchProfile, fetchProfilesFromTweets };