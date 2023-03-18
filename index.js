const puppeteer = require('puppeteer');
const login = require('./login');
const { fields } = require('./fields');

const timeout  = 120 * 1000;


// Extract text content:
// dir="auto"data-testid="tweetText" span

// Side container base with section role region as child
// parent data-testid="sidebarColumn"


// Main container base with section role region as child
// parent data-testid="primaryColumn"
//

// r._reactRootContainer._internalRoot.current.memoizedState.element.props.children.props.store.getState()
// React State

async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false, timeout, args: ['--no-sandbox'], userDataDir: './twitter', defaultViewport: null });
        // const browser = await puppeteer.launch({ headless: false, timeout, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('https://twitter.com/login', { waitUntil: 'networkidle2',  })

        const url = await page.url();

        console.log('URL PRE AUTH');

        if (!url.includes('home')) {
            await login(page);
        }

        // await page.waitForNetworkIdle('networkidle2');

        console.log('POST LOGIN')
        // await page.reload({waitUntil: 'networkidle2'});
        
        await page.waitForSelector(fields.tweet.base)
        console.log('POST TWEETS')
        
        const bases = await page.$$(fields.tweet.base);
        console.log('POST TWEETS FETCH')
        
        for (let baseIndex=0; baseIndex<bases.length; baseIndex++) {
            const base = bases[baseIndex];
            const linkBase = await base.$$('div a');
            const links = [];

            for (let linkIndex=0; linkIndex<linkBase.length; linkIndex++) {
                const link = linkBase[linkIndex];
                const span = await link.$('span');
                const text = await span?.evaluate((el) => el.innerText.toLowerCase());
                const linkText = await link.evaluate((el) => el.getAttribute('href'));

                links.push({
                    text,
                    link: linkText
                })
            }


            console.log('POST TWEETS LINKs', baseIndex)
            console.log(links)
            const spans = await base.$$('div span');            
        }

        function logger(data) {
            console.log(data) 
        }

        const data = await page.evaluate(function (callback) {
            console.log('callback')
            console.log(callback)
            var  r = document.getElementById('react-root')
            var x = r._reactRootContainer._internalRoot.current.memoizedState.element.props.children.props.store.getState()
            return x;
        }, logger);

        console.log('POST DATA')
        console.log(data)


    } catch (error) {
     console.log('error');
     console.log(error);
    }
}


main();