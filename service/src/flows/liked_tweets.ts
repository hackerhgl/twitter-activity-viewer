import * as path from 'path'
import { fields } from 'static/fields'
import { sleep, writeJsonFile } from 'utils'
import { getReduxDump } from 'utils/puppeteer'
import { type Page } from 'puppeteer'

async function scrollToBottom (page: Page) {
  try {
    await page.evaluate(async () => {
      const scrollHeight = document.body.scrollHeight
      scrollTo(0, scrollHeight)
    })
  } catch (error) {
    console.log('Error in scrollToBottom')
    console.log(error)
  }
}

async function scrollAndWait (page: Page) {
  try {
    await scrollToBottom(page)
    await page.waitForSelector(fields.loader)
    page.waitForFunction(() => !document.querySelector(fields.loader))
    await scrollToBottom(page)
    await sleep(1000)
  } catch (error) {
    console.log('Error in scrollAndWait')
    console.log(error)
  }
}

async function getReduxParsedDump (page: Page) {
  try {
    const state = await getReduxDump(page)
    const tweets = Object.values(state.entities.tweets.entities)
    const users = state.entities.users.entities
    return { tweets, users }
  } catch (error) {
    console.log('Error in getReduxTweetsDump')
    console.log(error)
  }
}

export async function flowFetchLikedTweets (page: Page) {
  try {
    await page.goto('https://twitter.com/hackerhgl/likes', { waitUntil: 'networkidle2' })
    await page.waitForSelector(fields.tweet.base)

    let tweets = []
    const repeatAmount = 5
    let repeated = 0

    while (true) {
      const data = await getReduxParsedDump(page)
      console.log('while loop | data', data.tweets.length, 'tweets:', tweets.length)
      if (data.tweets.length === tweets.length && repeated < repeatAmount) {
        repeated++
        continue
      }
      if (data.tweets.length === tweets.length && repeated >= repeatAmount) {
        break
      }
      repeated = 0
      tweets = [...data.tweets]
      await scrollAndWait(page)
      writeJsonFile('users', JSON.stringify(data.users, null, 2))
      writeJsonFile('tweets', JSON.stringify(tweets, null, 2))
    }
  } catch (e) {
    console.log('Error in likedTweets')
    console.log(e)
  }
}
