import { auth } from 'configs/creds';
import { type Page } from 'puppeteer';
import { fields } from 'static/fields';
import { clickButton } from 'utils/puppeteer';
const options = { timeout: 2000 };

export async function flowLogin(page: Page) {
    const email = await page.waitForSelector(fields.username);
    if (!email) {
        throw new Error('No email field found');
    }
    await email.type(auth.email);

    await clickButton(page, 'next');
    console.log('LOGIN: ', 'PRE-loader');
    await page.waitForNetworkIdle();
    console.log('LOGIN: ', 'POST-loader');

    // Here we check for additional security check for username verification
    // Sometimes Twitter will ask for a username to verify the account as additional layer to prevent bots, lol.
    await userNameVerificationCheck(page);

    const password = await page.waitForSelector(fields.password);
    if (!password) {
        throw new Error('No password field found');
    }
    await password.type(auth.password);

    await clickButton(page, 'log in');
    await page.waitForNetworkIdle();

    // Here we check for additional blocker modal that checks for already logged in account
    await alreadyLoggedInModal(page);
}

async function userNameVerificationCheck(page: Page) {
    try {
        const text = await page.waitForSelector(fields.text, options);
        if (!text) {
            throw new Error('No text field found');
        }
        console.log('POST TEXT');

        // Here we get the value of the text field
        const valueCheck = await text.evaluate(
            (el) => el.getAttribute('value'),
            options,
        );
        console.log('LOGIN: ', 'TEXT load post: ', text, valueCheck);
        // If the value of the text field is not the username, we need to enter it
        if (!valueCheck) {
            const username = await page.waitForSelector(fields.text, options);
            if (!username) {
                throw new Error('No username field found');
            }
            await username.type(auth.username);

            await clickButton(page, 'next');
            await page.waitForNetworkIdle();
        }
    } catch (error) {
        console.log('Username verification not found');
        console.log(error);
    }
}

async function alreadyLoggedInModal(page: Page) {
    console.log('async function alreadyLoggedInModal(page: Page) {');

    try {
        const text =
            'The account being added is already logged in.'.toLowerCase();
        const modal = await page.waitForSelector(
            fields.modal.alreadyLoggedIn,
            options,
        );
        console.log('modal: ', 'pre modal');

        if (modal) {
            const modalHeading = await modal.evaluate((el: HTMLElement) =>
                el.innerText?.toLowerCase(),
            );

            if (modalHeading === text) {
                await clickButton(page, 'next');
                await page.waitForNetworkIdle();
            }
        }
    } catch (error) {
        console.log('already logged in modal not founds');
        console.log(error);
    }
}
