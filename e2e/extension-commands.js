function extensionCommands(extensionPage) {
  const extensionId = 'nabnniifflcoipfbbpaagkdnongdnkmb'

  return {
    clearStorage: async function () {
      await extensionPage.evaluate(() => {
        return chrome.runtime.sendMessage('nabnniifflcoipfbbpaagkdnongdnkmb', { type: 'clearStorage' })
      })
    },
    setStorage: async function ({ goal }) {
      await extensionPage.evaluate(
        ({ goal }) => {
          return chrome.runtime.sendMessage('nabnniifflcoipfbbpaagkdnongdnkmb', { type: 'setStorage', goal })
        },
        { goal }
      )
    },
    reload: async function () {
      await extensionPage.evaluate(() => {
        return chrome.runtime.sendMessage('nabnniifflcoipfbbpaagkdnongdnkmb', { type: 'reload' })
      })
    },
  }
}

module.exports = extensionCommands
