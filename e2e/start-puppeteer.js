const puppeteer = require('puppeteer')
const extensionCommands = require('./extension-commands.js')

async function startPuppeteer({ pageUrl }) {
  const pathToExtension = require('path').join(__dirname, '../test-build')
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
    defaultViewport: null,
  })

  const page = await browser.newPage()
  await page.goto(pageUrl, { waitUntil: 'load' })
  const extension = extensionCommands(page)

  return {
    page,
    browser,
    extension,
  }
}

module.exports = startPuppeteer
