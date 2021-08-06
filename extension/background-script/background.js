import { injectGoalPrompt, cleanupGoalPrompt, injectGoalDisplay, cleanupGoalDisplay } from './utils/script-injection.js'

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

    injectGoalDisplay(details.tabId);
  });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if ('goal' in message) {
    chrome.storage.local.set(message);

    cleanupGoalPrompt(sender.tab.id);
    injectGoalDisplay(sender.tab.id);
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if ('goalUpdate' in message) {
    chrome.storage.local.remove("goal");

    cleanupGoalDisplay(sender.tab.id);
    injectGoalPrompt(sender.tab.id);
  }
});
