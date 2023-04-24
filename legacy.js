// Crawl tweets

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

// Dump tweets to file
        console.log('POST DATA')
        console.log(data)

        fs.writeFileSync('data/data.json', JSON.stringify(data, null, 2));

        const tweets = data.entities.tweets.entities;
        const tweetIds = Object.keys(tweets);
        tweetIds.forEach((id) => {
            const tweet = tweets[id];
            console.log('TWEET', tweet.text);
        });