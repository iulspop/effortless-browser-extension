import { injectNudges, sender, broadcaster, secondsRemaining } from './utils/utils.js'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear()
});

chrome.webNavigation.onCompleted.addListener(details => {
  if (details.frameId !== 0) { return null }

  injectNudges(details.tabId, [details.frameId], () => {
    const send = sender(details.tabId, details.frameId)

    chrome.storage.local.get(['goal', 'durationInMinutes', 'startTime'], ({ goal, durationInMinutes, startTime }) => {
      if (goal) {
        const secondsLeft = secondsRemaining(startTime, durationInMinutes)
        send({goalActive: true, goal, secondsLeft})
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
    const durationInMinutes = Number(message.time) / 60
    const secondsLeft = secondsRemaining(startTime, durationInMinutes)

    chrome.storage.local.set({ goal: message.goal, durationInMinutes, startTime })
    chrome.alarms.create(String(sender.frameId), { delayInMinutes: durationInMinutes })
    broadcast({goalActive: true, goal: message.goal, secondsLeft})
  }

  if (message.goalStatus === true) {
    chrome.storage.local.remove(["goal", "durationInMinutes", "startTime"])
    broadcast({goalActive: false})
  }
})

chrome.alarms.onAlarm.addListener(({ name }) => {
  chrome.storage.local.remove(["goal", "durationInMinutes", "startTime"])

  const frameId = name
  const broadcast = broadcaster(Number(frameId))
  broadcast({goalActive: false})
})
