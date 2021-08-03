chrome.webNavigation.onCompleted.addListener(({ tabId }) => {
  chrome.scripting.insertCSS(
    {
      target: { tabId },
      files: ['content-scripts/create-goal-prompt/create-goal-prompt.css'],
    }
  );
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: ['content-scripts/create-goal-prompt/create-goal-prompt.js'],
    }
  );
});

chrome.runtime.onMessage.addListener(message => {
  if (goal in message) {
    const data = { goal: message.goal };
    chrome.storage.local.set(data);
  }
});
