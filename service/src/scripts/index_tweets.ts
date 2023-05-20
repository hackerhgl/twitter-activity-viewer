import { loadJsonFile, writeJsonFile } from "utils";

interface Index {
    [key: string]: string[];
}

interface TweetIndex {
    tweets: string[];
    user: string;
}

function main() {
    try {
        const tweets = loadJsonFile<any[]>('tweets');
        // { 'userId': ['tweetId'] }
        const index: Index = {};
        tweets.forEach((tweet) => {
            const { user, id_str: id } = tweet;
            if (index[user]) {
                // index[user].count += 1;
                index[user].push(id);
            } else {
                index[user] = [id];
            }
        });

        const array: TweetIndex[] = [];

        Object.keys(index).forEach((key) => {
            array.push({
                tweets: index[key],
                user: key,
            });
        });

        array.sort((a, b) => {
            if (a.tweets.length > b.tweets.length) {
                return -1;
            }
            if (a.tweets.length < b.tweets.length) {
                return 1;
            }
            return 0;
        });

        const json = JSON.stringify(array);
        writeJsonFile('tweets_index', json);
    } catch (e) {
        console.log('error in tweets indexing main');
        console.log(e);
    }
}

main();