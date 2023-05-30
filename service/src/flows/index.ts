import puppeteer from 'puppeteer';
import { flowLogin } from './login';
import { flowFetchLikedTweets } from './liked_tweets';

async function main(): Promise<void> {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox'],
            userDataDir: './tmp/twitter',
            defaultViewport: null,
        });
        // const browser = await puppeteer.launch({ headless: false, timeout, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        page.setDefaultTimeout(0);
        await page.goto('https://twitter.com/i/flow/login', {
            waitUntil: 'networkidle2',
        });
        const url = page.url();
        if (!url.includes('home')) {
            await flowLogin(page);
        }
        await flowFetchLikedTweets(page);
    } catch (error) {
        console.log('Error in main');
        console.log(error);
    }
}

main();
