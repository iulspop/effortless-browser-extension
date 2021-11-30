const startPuppeteer = require('./start-puppeteer')
require('pptr-testing-library/extend')

describe('Goal Prompt Popup', () => {
  let page, browser

  beforeAll(async () => {
    const context = await startPuppeteer({ pageUrl: 'http://localhost:8080/turtle.html' })
    page = context.page
    browser = context.browser
  })

  test('A goal is not set and the user visits a page', async () => {
    const $document = await page.getDocument(page)

    const $input1 = await $document.findByLabelText(/what outcome do you seek?/i)
    await $input1.type('Learn just enough from Cypress docs so I can write my tests')

    const $submit = await $document.$('#indistractable-extension').then(async $el => await $el.findByRole('button'))
    await $submit.click()

    const $input2 = await $document.findByLabelText(/how many minutes to hit that target?/i)
    await $input2.type('15')

    await $submit.click()

    // user sees the goal prompt pop up and enters their goal and time, the prompt disappear and the goal display appears
    expect(
      await $document
        .findByText('Learn just enough from Cypress docs so I can write my tests')
        .then(async $el => await $el.isIntersectingViewport())
    ).toBe(true)
  })

  afterAll(async () => {
    await browser.close()
  })
})
