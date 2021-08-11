Cypress.Commands.add('sendMessage', (message) => {
  // The extension id in development
  // It remains constant because it is derived from the key in the manifest.json
  let extensionId = "nabnniifflcoipfbbpaagkdnongdnkmb";

  function dispatchMessageEvent(extensionId, message) {
    let triggerMessage = new CustomEvent("messageToRelay", {detail: {extensionId, message}});
    window.document.dispatchEvent(triggerMessage);
  }

  dispatchMessageEvent(extensionId, message)
})

Cypress.Commands.add('resetExtensionState', () => {
  cy.sendMessage({ resetState: true })
})

Cypress.Commands.add('setExtensionState', (newState) => {
  cy.sendMessage({ setState: true, newState })
})
