import { auth } from 'configs/creds';
import { Page } from 'puppeteer';
import { fields } from 'static/fields';
import { clickButton, loader } from 'utils/puppeteer';

export async function flowLogin(page: Page) {
    const email = await page.waitForSelector(fields.email);
    await email.type(auth.email);
    
    await clickButton(page, 'next');
    console.log('LOGIN: ','PRE-loader');
    await page.waitForNetworkIdle();
    console.log('LOGIN: ','POST-loader');
    
    // const url = await page.url();
    
    const text = await page.waitForSelector(fields.text);
    const valueCheck = await text.evaluate((el) => el.getAttribute('value'));
    console.log('LOGIN: ','TEXT load post: ', text, valueCheck);
    

    if (!valueCheck) {
        const username = await page.waitForSelector(fields.text);
        await username.type(auth.username);

        await clickButton(page, 'next');
        await page.waitForNetworkIdle();
    }
    
    const password = await page.waitForSelector(fields.password);
    await password.type(auth.password);
    
    await clickButton(page, 'log in');
    await loader(page);
}
