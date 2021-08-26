// import { goalPrompt } from './goal-prompt/goal-prompt.js'
// import { goalDisplay } from './goal-display/goal-display.js'

console.log("Controller Loaded.")

chrome.runtime.onMessage.addListener(message => {
  if (message.goalActive === true) {
    console.log('Goal Active!')
  }
  if (message.goalInactive === true) {
    console.log('Goal Inactive!')
  }
})