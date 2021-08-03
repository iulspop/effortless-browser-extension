function insertCSS(tabId, file) {
  chrome.scripting.insertCSS(
    {
      target: { tabId },
      files: [file],
    }
  );
}

function removeCSS(tabId, file) {
  chrome.scripting.removeCSS(
    {
      target: { tabId },
      files: [file],
    }
  );
}

function executeScript(tabId, file) {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: [file],
    }
  );
}


chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason) {
    chrome.storage.local.clear();
  }
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.parentFrameId !== 0) { return null }

  chrome.storage.local.get(['goal'], ({ goal }) => {
    if (goal) { return null }

    insertCSS(
      details.tabId,
      'content-scripts/create-goal-prompt/create-goal-prompt.css'
    )
    executeScript(
      details.tabId,
      'content-scripts/create-goal-prompt/create-goal-prompt.js'
    )
  });
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.parentFrameId !== 0) { return null }

  chrome.storage.local.get(['goal'], ({ goal }) => {
    if (!goal) { return null }

    insertCSS(
      details.tabId,
      'content-scripts/create-goal-display/create-goal-display.css'
    );
    executeScript(
      details.tabId,
      'content-scripts/create-goal-display/create-goal-display.js'
    );
  });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if ('goal' in message) {
    chrome.storage.local.set(message);

    executeScript(
      sender.tab.id,
      'content-scripts/create-goal-prompt/delete-goal-prompt.js'
    );
    removeCSS(
      sender.tab.id,
      'content-scripts/create-goal-prompt/create-goal-prompt.css'
    );

    insertCSS(
      sender.tab.id,
      'content-scripts/create-goal-display/create-goal-display.css'
    );
    executeScript(
      sender.tab.id,
      'content-scripts/create-goal-display/create-goal-display.js'
    );
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if ('goalUpdate' in message) {
    chrome.storage.local.remove("goal");

    executeScript(
      sender.tab.id,
      'content-scripts/create-goal-display/delete-goal-display.js'
    );
    removeCSS(
      sender.tab.id,
      'content-scripts/create-goal-display/create-goal-display.css'
    );

    insertCSS(
      sender.tab.id,
      'content-scripts/create-goal-prompt/create-goal-prompt.css'
    )
    executeScript(
      sender.tab.id,
      'content-scripts/create-goal-prompt/create-goal-prompt.js'
    )
  }
});