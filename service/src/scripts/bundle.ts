import * as fs from 'fs';
import * as path from 'path';
import { clients } from 'static/clients';

const files = ['tweets', 'tweets_index', 'users'].map((v) => `${v}.json`);

function main(): void {
    clients.forEach((client) => {
        files.forEach((file) => {
            const source = path.join('./', 'tmp', 'data', file);
            const destination = path.join('..', ...client, file);
            fs.copyFileSync(source, destination);
        });
    });
}

main();
