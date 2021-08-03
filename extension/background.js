chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason) {
    chrome.storage.local.clear();
  }
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.parentFrameId !== 0) { return null }

  chrome.storage.local.get(['goal'], ({ goal }) => {
    if (goal) { return null }

    chrome.scripting.insertCSS(
      {
        target: { tabId: details.tabId },
        files: ['content-scripts/create-goal-prompt/create-goal-prompt.css'],
      }
    );

    chrome.scripting.executeScript(
      {
        target: { tabId: details.tabId },
        files: ['content-scripts/create-goal-prompt/create-goal-prompt.js'],
      }
    );
  });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if ('goal' in message) {
    const data = { goal: message.goal };
    chrome.storage.local.set(data);

    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: ['content-scripts/create-goal-prompt/delete-goal-prompt.js'],
      }
    );
    chrome.scripting.removeCSS(
      {
        target: { tabId: sender.tab.id },
        files: ['content-scripts/create-goal-prompt/create-goal-prompt.css'],
      }
    );
  }
});
