chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.tabs.executeScript(details.tabId, {
      file: 'createPromptBubble.js'
  });
});