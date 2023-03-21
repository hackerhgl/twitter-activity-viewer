const puppeteer = require('puppeteer');
const login = require('./login');
const { fetchProfile } = require('./fetch_profile');

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

        await fetchProfile(page, 'MattWallace888');

    } catch (error) {
     console.log('error');
     console.log(error);
    }
}


main();