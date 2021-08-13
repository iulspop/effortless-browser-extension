import { injectGoalPrompt, cleanupGoalPrompt, injectGoalDisplay, cleanupGoalDisplay } from './utils/script-injection.js'

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.clear();
  }
});

chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId !== 0) { return null }

  chrome.storage.local.get(['goal'], ({ goal }) => {
    if (goal) { return null }

    injectGoalPrompt(details.tabId, [details.frameId]);
  });
});

chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId !== 0) { return null }

  chrome.storage.local.get(['goal'], ({ goal }) => {
    if (!goal) { return null }

    injectGoalDisplay(details.tabId, [details.frameId]);
  });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if ('goal' in message) {
    chrome.storage.local.set(message);

    cleanupGoalPrompt(sender.tab.id, [sender.frameId]);
    injectGoalDisplay(sender.tab.id, [sender.frameId]);
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if ('goalUpdate' in message) {
    chrome.storage.local.remove("goal");

    cleanupGoalDisplay(sender.tab.id, [sender.frameId]);
    injectGoalPrompt(sender.tab.id, [sender.frameId]);
  }
});

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  console.log('Received message:');
  console.log(message);
  console.log('From the sender:');
  console.log(sender);

  if (message.resetState === true) {
    chrome.storage.local.clear();
    sendResponse({message: "Reset the storage. Yay!"});
  }

  if (message.setState === true) {
    chrome.storage.local.set(message.newState);
    sendResponse({message: "Set the new state. Yay!"});
  }
});