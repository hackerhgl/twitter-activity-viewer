const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const path = require('path');

const { safeCreateDir } = require('./utils');

const files = ['data', 'tweets_index', 'users'].map(v => path.join('data', `${v}.json`));

async function main() {
    try {
        const time = Date.now();
        const formattedTime = dayjs(time).format('YYYY-MM-DD_HH-mm-ss');
        const dirPath = path.join('tmp', formattedTime);
        safeCreateDir(dirPath);
        files.forEach(v => {
            fs.copyFileSync(v, path.join(dirPath, v));
        });
    } catch (e) {
        console.log(e)
    }
}

main();