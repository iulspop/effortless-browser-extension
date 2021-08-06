import { injectGoalPrompt, cleanupGoalPrompt } from './utils/script-injection.js'

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason) {
    chrome.storage.local.clear();
  }
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId !== 0) { return null }

  chrome.storage.local.get(['goal'], ({ goal }) => {
    if (goal) { return null }

    injectGoalPrompt(details.tabId);
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

    cleanupGoalPrompt(sender.tab.id)

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

    injectGoalPrompt(sender.tab.id);
  }
});