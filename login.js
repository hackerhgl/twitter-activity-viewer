const { auth }  = require('./creds');
const { fields } = require('./fields');
const { clickButton, loader } = require('./utils');

async function login(page) {
    const email = await page.waitForSelector(fields.email);
    await email.type(auth.email);
    
    await clickButton(page, 'next');
    console.log('PRE-loader');
    await page.waitForNetworkIdle('networkidle2');
    console.log('POST-loader');
    
    // const url = await page.url();
    
    const text = await page.waitForSelector(fields.text);
    const valueCheck = await text.evaluate((el) => el.getAttribute('value'));
    console.log('TEXT load post: ', text, valueCheck);
    

    if (!valueCheck) {
        const username = await page.waitForSelector(fields.text);
        await username.type(auth.username);

        await clickButton(page, 'next');
        await page.waitForNetworkIdle('networkidle2');
    }
    
    const password = await page.waitForSelector(fields.password);
    await password.type(auth.password);
    
    await clickButton(page, 'log in');
    await loader();
}

module.exports = {login};