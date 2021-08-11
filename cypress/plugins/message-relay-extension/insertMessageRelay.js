(function insertMesssageRelay() {
  window.document.addEventListener("messageToRelay", event => {
    let data = event.detail;
    let extensionId = data.extensionId;
    let message = data.message;

    chrome.runtime.sendMessage(extensionId, message, (response) => {
      console.log(`Message sent successfully!`)
      console.log('This message was sent:')
      console.log(message)
      console.log(`to the extension with the id of: ${extensionId}`)
      console.log('The response from the extension:')
      console.log(response)
    })

    console.log('Tried sending this data:')
    console.log(data);
  })
})()