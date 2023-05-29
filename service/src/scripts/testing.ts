import * as fs from 'fs';
import * as path from 'path';
import { loadJsonFile } from 'utils';

const files = ['data', 'tweets_index', 'users'].map((v) => `${v}.json`);
const destination = path.join('client', 'src', 'assets');

async function main() {
    const tweets = loadJsonFile('tweets_index');
    // console.log(tweets);

    // files.forEach((file) => {
    //     const source = path.join('data', file);
    //     fs.copyFileSync(source, path.join(destination, file));
    // });
}

main();
