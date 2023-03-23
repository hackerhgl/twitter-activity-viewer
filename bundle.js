const fs = require('fs');

const files = ['data','tweets_index','users'].map((v) => `${v}.json`);
const destination = 'client/src/assets';

async function main() {
    files.forEach((path) => {
        fs.copyFileSync(path, `${destination}/${path}`);
    });
}

main();