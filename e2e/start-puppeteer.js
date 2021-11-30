const puppeteer = require('puppeteer')

async function startPuppeteer({ pageUrl }) {
  const pathToExtension = require('path').join(__dirname, '../dev-build')
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
    defaultViewport: null,
  })

  const page = await browser.newPage()
  await page.goto(pageUrl, { waitUntil: 'load' })

  return {
    page,
    browser,
  }
}

module.exports = startPuppeteer
