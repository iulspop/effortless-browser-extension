import { injectNudges, messenger } from './utils/utils.js'

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.clear();
  }
});

chrome.webNavigation.onCompleted.addListener(details => {
  if (details.frameId !== 0) { return null }

  injectNudges(details.tabId, [details.frameId], () => {
    const send = messenger(details.tabId, details.frameId)

    chrome.storage.local.get(['goal'], ({ goal }) => {
      goal ? send({goalActive: true, goal}) : send({goalActive: false})
    })
  })
})

chrome.runtime.onMessage.addListener((message, sender) => {
  const send = messenger(sender.tab.id, sender.frameId)

  if (message.goalSet === true) {
    chrome.storage.local.set({ goal: message.goal })
    send({goalActive: true, goal: message.goal})
  }

  if (message.goalStatus === true) {
    chrome.storage.local.remove("goal");
    send({goalActive: false})
  }
})
