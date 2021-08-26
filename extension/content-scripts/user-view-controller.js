import { goalPrompt } from './goal-prompt/goal-prompt.js'
import { goalDisplay } from './goal-display/goal-display.js'

console.log("Controller Loaded.")

chrome.runtime.onMessage.addListener(message => {
  if (message.goalActive === true) {
    console.log('Goal Active!')
    goalDisplay.create()
    goalPrompt.delete()
  }
  if (message.goalInactive === true) {
    console.log('Goal Inactive!')
    goalPrompt.create()
    goalDisplay.delete()
  }
})