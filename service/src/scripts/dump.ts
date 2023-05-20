import * as fs from 'fs';
import * as path from 'path';
import * as dayjs from 'dayjs';
import { safeCreateDir } from 'utils';


const files = ['tweets', 'tweets_index', 'users'].map(v => `${v}.json`);

async function main() {
    try {
        const time = Date.now();
        const formattedTime = dayjs(time).format('YYYY-MM-DD_HH-mm-ss');
        const dirPath = path.join('tmp', 'dumps', formattedTime);
        safeCreateDir(dirPath);
        files.forEach((file) => {
            const source = path.join('tmp', 'data', file);
            const destination = path.join(dirPath, file);
            fs.copyFileSync(source, destination);
        });
    } catch (e) {
        console.log(e)
    }
}

main();