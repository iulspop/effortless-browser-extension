const startPuppeteer = require('./start-puppeteer')
require('pptr-testing-library/extend')

describe('Goal Prompt Popup', () => {
  let page, extension, browser, $document

  beforeAll(async () => {
    const context = await startPuppeteer({ pageUrl: 'https://localhost:8080/turtle.html' })
    page = context.page
    extension = context.extension
    browser = context.browser

    await extension.clearStorage()
    await extension.reload()
    $document = await page.getDocument(page)
  })

  const goalText = 'Learn just enough from Cypress docs so I can write my tests'

  test('A goal is not set and the user visits a page', async () => {
    const $input1 = await $document.findByLabelText(/what outcome do you seek?/i)
    await $input1.type(goalText)

    const $submit = await $document.$('#indistractable-extension').then(async $el => await $el.findByRole('button'))
    await $submit.click()

    const $input2 = await $document.findByLabelText(/how many minutes to hit that target?/i)
    await $input2.type('15')
    await $submit.click()
    await page.keyboard.press('Enter')

    expect(
      await $document
        .findByText(goalText)
        .then(async $el => await $el.isIntersectingViewport())
    ).toBe(true)
  })

  // test('Complete button works', async () => {
  //   await extension.setStorage({ goal: goalText })
  //   await page.reload()
  //   $document = await page.getDocument(page)

  //   const $complete = await $document.findByRole('button', { name: /complete/i }, { timeout: 2000 })
  //   await $complete.click()

  //   expect(await $document.findByLabelText(/what outcome do you seek?/i, { timeout: 2000 })).toBeTruthy()
  // })

  // test('Interrupt button works', async () => {
  //   await extension.setStorage({ goal: goalText })
  //   await page.reload()
  //   $document = await page.getDocument(page)

  //   const $interrupt = await $document.findByRole('button', { name: /interrupt/i }, { timeout: 2000 })
  //   await $interrupt.click()

  //   expect(await $document.findByLabelText(/what outcome do you seek?/i, { timeout: 2000 })).toBeTruthy()
  // })
})
