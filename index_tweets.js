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

        fs.writeFileSync('./tweets_index.json', JSON.stringify(index));
    } catch (e) {
        console.log('error in tweets indexing main');
        console.log(e);
    }
}

main();