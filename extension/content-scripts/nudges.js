import { goalPrompt }  from './goal-prompt/goal-prompt.js'
import { goalDisplay } from './goal-display/goal-display.js'
import { injectFont }  from './utils/injectFont.js'
import { injectStylesheet } from './utils/injectStylesheet.js'

injectFont(`@font-face {
  font-family: "Lato";
  src: url(${chrome.runtime.getURL('fonts/Lato-Regular.ttf')}) format("truetype"),
       url(${chrome.runtime.getURL('fonts/Lato-Bold.ttf')}) format("truetype");
}`)
injectStylesheet('content-scripts/goal-prompt/goal-prompt.css')
injectStylesheet('content-scripts/goal-display/goal-display.css')

chrome.runtime.onMessage.addListener(message => {
  if (message.goalActive === true) {
    goalPrompt.delete()
    goalDisplay.create(message.goal)
  }
  if (message.goalActive === false) {
    goalDisplay.delete()
    goalPrompt.create()
  }
})
