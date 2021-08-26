// Used to control extension state when running e2e tests with Cypress
// Should be imported into the background.js service worked of the extension you wish to control
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
