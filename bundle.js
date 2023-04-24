const fs = require('fs');
const path = require('path');

const files = ['data','tweets_index','users'].map((v) => `${v}.json`);
const destination = path.join('client', 'src', 'assets');

async function main() {
    files.forEach((file) => {
        const source = path.join('data', file);
        fs.copyFileSync(source, path.join(destination, file));
    });
}

main();