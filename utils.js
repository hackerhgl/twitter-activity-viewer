async function getButtonSafe(button) {
    try {
        const check = await button.$('div span span', { })
        return check;
    } catch {
        return null;
    }
}

async function clickButton(page, name) {
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

async function loader(page) {
    // await page.waitForSelector(fields.loader);
    await page.waitForFunction(() => !document.querySelector(fields.loader));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { clickButton, loader, sleep };