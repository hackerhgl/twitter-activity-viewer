const tweets = require('./data.json');
const fs = require('fs');

function main() {
    try {
        const index = {};
        tweets.forEach((tweet) => {
            if (index[tweet.user] > 0) {
                index[tweet.user] += 1;
            } else {
                index[tweet.user] = 1;
            }
        });

        const array = [];

        Object.keys(index).forEach((key) => {
            array.push({
                user: key,
                count: index[key],
            });
        });
        console.log(array);

        array.sort((a, b) => {
            if (a.count > b.count) {
                return -1;
            }
            if (a.count < b.count) {
                return 1;
            }
            return 0;
        });

        fs.writeFileSync('./tweets_index.json', JSON.stringify(array));
    } catch (e) {
        console.log('error in tweets indexing main');
        console.log(e);
    }
}

main();