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

export const messenger = (tabId, frameId) => message => {
  chrome.tabs.sendMessage(tabId, message, { frameId })
}
