import { injectNudges, messenger } from './utils/utils.js'

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.clear();
  }
});

chrome.webNavigation.onCompleted.addListener(details => {
  if (details.frameId !== 0) { return null }

  injectNudges(details.tabId, [details.frameId], () => {
    const send = messenger(details.tabId, details.frameId)

    chrome.storage.local.get(['goal'], ({ goal }) => {
      goal ? send({goalActive: true}) : send({goalInactive: true})
    })
  })

})

chrome.runtime.onMessage.addListener((message, sender) => {
  const send = messenger(sender.tab.id, sender.frameId)

  if ('goalSet' in message) {
    chrome.storage.local.set({ goal: message.goalSet })
    send({goalActive: true})
  }

  if ('goalStatus' in message) {
    chrome.storage.local.remove("goal");
    send({goalInactive: true})
  }
})

// Used to control extension state when running e2e tests with Cypress
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
