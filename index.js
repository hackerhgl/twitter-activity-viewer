const puppeteer = require('puppeteer');
const login = require('./login');

async function getReduxTweetsDump(page) {
    try {
        const data = await page.evaluate(function () {
        const root = document.getElementById('react-root')
        const state = root._reactRootContainer._internalRoot.current.memoizedState.element.props.children.props.store.getState()
        const tweets = state.entities.tweets.entities;
        const parsed = Object.values(tweets);
        return parsed;
    });
    return data;   
    } catch (error) {
        console.log('Error in getReduxTweetsDump');
        console.log(error);
    }
}

async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'], userDataDir: './twitter', defaultViewport: null });
        // const browser = await puppeteer.launch({ headless: false, timeout, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('https://twitter.com/login', { waitUntil: 'networkidle2', timeout })
        const url = await page.url();
        console.log('URL PRE AUTH');

        if (!url.includes('home')) {
            await login(page);
        }



    } catch (error) {
     console.log('error');
     console.log(error);
    }
}


main();