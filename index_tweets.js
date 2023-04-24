const tweets = require('./data/data.json');
const fs = require('fs');
const path = require('path');

function main() {
    try {
        // { 'userId': ['tweetId'] }
        const index = {};
        tweets.forEach((tweet) => {
            const { user, id_str: id } = tweet;
            if (index[user]) {
                // index[user].count += 1;
                index[user].push(id);
            } else {
                index[user] = [id];
            }
        });

        const array = [];

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

        fs.writeFileSync(path.join('data', 'tweets_index.json'), JSON.stringify(array, null, 2));
    } catch (e) {
        console.log('error in tweets indexing main');
        console.log(e);
    }
}

main();