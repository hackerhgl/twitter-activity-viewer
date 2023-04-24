const fs = require('fs');
const path = require('path');

const files = ['data','tweets_index','users'].map((v) => path.join('data', `${v}.json`));
const destination = path.join('client', 'src', 'assets');

async function main() {
    files.forEach((path) => {
        fs.copyFileSync(path, path.join(destination, path));
    });
}

main();