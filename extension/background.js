chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.storage.local.get(['goal'], (items) => {
    if (items.goal) {
      chrome.scripting.executeScript(
        {
          target: {tabId: details.tabId},
          files: ['createBubble.js'],
        },
        () => {}
      );
    };
  });
});
