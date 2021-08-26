chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.clear();
  }
});

chrome.webNavigation.onCompleted.addListener(details => {
  if (details.frameId !== 0) { return null }

  chrome.scripting.executeScript(
    {
      target: {tabId: details.tabId, frameIds: [details.frameId]},
      files: ['content-scripts/user-view-controller.js']
    }
  , () => {
    const sendMsg = message => chrome.tabs.sendMessage(details.tabId, message, { frameId: details.frameId })

    chrome.storage.local.get(['goal'], ({ goal }) => {
      goal ? sendMsg({goalActive: true}) : sendMsg({goalInactive: true})
    })
  })

})

chrome.runtime.onMessage.addListener((message, sender) => {
  const sendMsg = message => chrome.tabs.sendMessage(sender.tab.id, message, { frameId: sender.frameId })

  if ('goalSet' in message) {
    chrome.storage.local.set({ goal: message.goalSet })
    sendMsg({goalActive: true})
  }

  if ('goalStatus' in message) {
    chrome.storage.local.remove("goal");
    sendMsg({goalInactive: true})
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
