const puppeteer = require('puppeteer')

;(async () => {
  const pathToExtension = require('path').join(__dirname, 'dev-build');
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
    defaultViewport: null,
  })


  const page = await browser.newPage()
  await page.goto('http://localhost:8080/turtle.html')

  // await browser.close();
})()
