// Used to control extension when running e2e tests with Puppeteer
// Should be imported into the background.js service worked of the extension you wish to control
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  console.log('Received message:')
  console.log(message)
  console.log('From the sender:')
  console.log(sender)

  if (message.type === 'clearStorage') {
    chrome.storage.local.clear()
    sendResponse({ message: 'Extension state reset' })
  } else if (message.type === 'setStorage') {
    chrome.storage.local.set(message.newState)
    sendResponse({ message: 'New extension state set' })
  } else if (message.type === 'reload') {
    chrome.runtime.reload()
    sendResponse({ message: 'Extension reloaded' })
  }
})
