chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: details.tabId },
      files: ['content-scripts/create-goal-prompt.js'],
    }
  );
});
