import { injectNudges, messenger, broadcaster } from './utils/utils.js'

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.clear();
  }
});

chrome.webNavigation.onCompleted.addListener(details => {
  if (details.frameId !== 0) { return null }

  injectNudges(details.tabId, [details.frameId], () => {
    const send = messenger(details.tabId, details.frameId)

    chrome.storage.local.get(['goal', 'duration', 'startTime'], ({ goal, duration, startTime }) => {
      if (goal) {
        const countDown = duration - ((new Date() - new Date(startTime)) / 1000)
        send({goalActive: true, goal, countDown})
      } else {
        send({goalActive: false})
      }
    })
  })
})

chrome.runtime.onMessage.addListener((message, sender) => {
  const broadcast = broadcaster(sender.frameId)

  if (message.goalSet === true) {
    const startTime = Date()
    const goalDurationInSeconds = Number(message.time) * 60
    const countDown = goalDurationInSeconds

    chrome.storage.local.set({ goal: message.goal, duration: goalDurationInSeconds, startTime })
    broadcast({goalActive: true, goal: message.goal, countDown})
  }

  if (message.goalStatus === true) {
    chrome.storage.local.remove("goal");
    broadcast({goalActive: false})
  }
})
