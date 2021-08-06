import { insertCSS, insertCSSFile, removeCSSFile, executeScript } from './background-script-utils/utils.js'

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason) {
    chrome.storage.local.clear();
  }
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId !== 0) { return null }

  chrome.storage.local.get(['goal'], ({ goal }) => {
    if (goal) { return null }

    insertCSS(
      details.tabId,
      `@font-face {
        font-family: "Lato";
        src: url(${chrome.runtime.getURL('fonts/Lato-Regular.ttf')}) format("truetype"),
             url(${chrome.runtime.getURL('fonts/Lato-Bold.ttf')}) format("truetype");
      }`
    )
    insertCSSFile(
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
  if (details.frameId !== 0) { return null }

  chrome.storage.local.get(['goal'], ({ goal }) => {
    if (!goal) { return null }

    insertCSSFile(
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
    removeCSSFile(
      sender.tab.id,
      'content-scripts/create-goal-prompt/create-goal-prompt.css'
    );

    insertCSSFile(
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
    removeCSSFile(
      sender.tab.id,
      'content-scripts/create-goal-display/create-goal-display.css'
    );

    insertCSS(
      details.tabId,
      `@font-face {
        font-family: "Lato";
        src: url(${chrome.runtime.getURL('fonts/Lato-Regular.ttf')}) format("truetype"),
             url(${chrome.runtime.getURL('fonts/Lato-Bold.ttf')}) format("truetype");
      }`
    )
    insertCSSFile(
      sender.tab.id,
      'content-scripts/create-goal-prompt/create-goal-prompt.css'
    )
    executeScript(
      sender.tab.id,
      'content-scripts/create-goal-prompt/create-goal-prompt.js'
    )
  }
});