function injectScript(file, tabId, frameIds, callback) {
  chrome.scripting.executeScript(
    {
      target: {tabId, frameIds},
      files: [file]
    }
  , callback)
}

export function injectNudges(tabId, frameIds, callback) {
  injectScript('content-scripts/nudges.js', tabId, frameIds, callback)
}

export const sender = (tabId, frameId) => message => {
  chrome.tabs.sendMessage(tabId, message, { frameId })
}

export function broadcaster(frameId) {
  return message => {
    chrome.windows.getAll({populate: true}, windows => {
      windows.forEach(window => {
        window.tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, message, { frameId })
        })
      })
    })
  }
}

export const secondsRemaining = (startTime, durationInMinutes) => ((durationInMinutes * 60) - ((new Date() - new Date(startTime)) / 1000))
