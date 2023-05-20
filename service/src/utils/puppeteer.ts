import { fields } from 'static/fields';

export async function getButtonSafe(button) {
    try {
        const check = await button.$('div span span', {});
        return check;
    } catch {
        return null;
    }
}

// This function is used to click on a button with a specific text
// name: text in span
export async function clickButton(page, name) {
  const buttons = await page.$$('div[role="button"]');
  for (let i=0; i<buttons.length; i++) {
        const button = buttons[i];
        const check = await getButtonSafe(button);
        if (check === null) continue;
        const text = await check.evaluate((el) => el.innerText.toLowerCase());
        if (text === name) {
            await button.click();
            break;
        }
    }
}

export async function loader(page) {
    // await page.waitForSelector(fields.loader);
    await page.waitForFunction(() => !document.querySelector(fields.loader));
}

// This function is used to get the redux dump from the page
export async function getReduxDump(page) {
    try {
        const data = await page.evaluate(() => {
        const root = document.getElementById('react-root')
        const state = root._reactRootContainer._internalRoot.current.memoizedState.element.props.children.props.store.getState()
        return state;
    });
    return data;   
    } catch (error) {
        console.log('Error in getReduxTweetsDump');
        console.log(error);
    }
}