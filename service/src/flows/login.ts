import { auth } from 'configs/creds'
import { type Page } from 'puppeteer'
import { fields } from 'static/fields'
import { clickButton, loader } from 'utils/puppeteer'

export async function flowLogin (page: Page) {
  const email = await page.waitForSelector(fields.email)
  if (!email) {
    throw new Error('No email field found')
  }
  await email.type(auth.email)

  await clickButton(page, 'next')
  console.log('LOGIN: ', 'PRE-loader')
  await page.waitForNetworkIdle()
  console.log('LOGIN: ', 'POST-loader')

  // const url = await page.url();

  const text = await page.waitForSelector(fields.text)
  if (!text) {
    throw new Error('No text field found')
  }
  const valueCheck = await text.evaluate((el) => el.getAttribute('value'))
  console.log('LOGIN: ', 'TEXT load post: ', text, valueCheck)

  if (!valueCheck) {
    const username = await page.waitForSelector(fields.text)
    if (!username) {
      throw new Error('No username field found')
    }
    await username.type(auth.username)

    await clickButton(page, 'next')
    await page.waitForNetworkIdle()
  }

  const password = await page.waitForSelector(fields.password)
  if (!password) {
    throw new Error('No password field found')
  }
  await password.type(auth.password)

  await clickButton(page, 'log in')
  await loader(page)
}
