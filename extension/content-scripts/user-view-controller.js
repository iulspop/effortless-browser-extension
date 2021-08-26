console.log("Controller Loaded.")

chrome.runtime.onMessage.addListener(message => {
  if (message.goalActive === true) {
    console.log('Goal Active!')
  }
  if (message.goalInactive === true) {
    console.log('Goal Inactive!')
  }
})