const puppeteer = require('puppeteer');
const login = require('./login');
const { fetchLikedTweets } = require('./liked_tweets');

async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'], userDataDir: './twitter', defaultViewport: null });
        // const browser = await puppeteer.launch({ headless: false, timeout, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0); 
        page.setDefaultTimeout(0)
        await page.goto('https://twitter.com/login', { waitUntil: 'networkidle2' })
        const url = await page.url();
        console.log('URL PRE AUTH');

        if (!url.includes('home')) {
            await login(page);
        }

        await fetchLikedTweets(page);

    } catch (error) {
     console.log('Error in main');
     console.log(error);
    }
}

main();