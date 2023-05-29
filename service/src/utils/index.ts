import * as fs from 'fs'
import * as path from 'path'

export async function sleep (ms: number) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

export function safeCreateDir (path: string) {
  try {
    const check = fs.existsSync(path)
    if (!check) {
      fs.mkdirSync(path, { recursive: true })
    }
  } catch (error) {
    console.log('Error in safeCreateDir function')
  }
}

export function loadJsonFile<T> (fileName: string): T | null {
  try {
    const filePath = path.join('tmp', 'data', `${fileName}.json`)
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data) as T
  } catch (error) {
    console.log('Error in loadJson function')
    console.log(error)
    return null
  }
}

export function writeJsonFile (fileName: string, content: string) {
  try {
    const filePath = path.join('tmp', 'data', `${fileName}.json`)
    fs.writeFileSync(filePath, content, 'utf8')
  } catch (error) {
    console.log('Error in writeJson function')
    console.log(error)
  }
}
