import { insertCSS, removeCSS, insertCSSFile, removeCSSFile, executeScript } from './utils.js'

function injectGoalPrompt(tabId) {
  insertCSS(
    tabId,
    `@font-face {
      font-family: "Lato";
      src: url(${chrome.runtime.getURL('fonts/Lato-Regular.ttf')}) format("truetype"),
           url(${chrome.runtime.getURL('fonts/Lato-Bold.ttf')}) format("truetype");
    }`
  );
  insertCSSFile(
    tabId,
    'content-scripts/create-goal-prompt/create-goal-prompt.css'
  );
  executeScript(
    tabId,
    'content-scripts/create-goal-prompt/create-goal-prompt.js'
  );
}

function cleanupGoalPrompt(tabId) {
  executeScript(
    tabId,
    'content-scripts/create-goal-prompt/delete-goal-prompt.js'
  );
  removeCSSFile(
    tabId,
    'content-scripts/create-goal-prompt/create-goal-prompt.css'
  );
  removeCSS(
    tabId,
    `@font-face {
      font-family: "Lato";
      src: url(${chrome.runtime.getURL('fonts/Lato-Regular.ttf')}) format("truetype"),
           url(${chrome.runtime.getURL('fonts/Lato-Bold.ttf')}) format("truetype");
    }`
  );
}

function injectGoalDisplay(tabId) {
  insertCSSFile(
    tabId,
    'content-scripts/create-goal-display/create-goal-display.css'
  );
  executeScript(
    tabId,
    'content-scripts/create-goal-display/create-goal-display.js'
  );
}

function cleanupGoalDisplay(tabId) {
  executeScript(
    tabId,
    'content-scripts/create-goal-display/delete-goal-display.js'
  );
  removeCSSFile(
    tabId,
    'content-scripts/create-goal-display/create-goal-display.css'
  );
}

export { injectGoalPrompt, cleanupGoalPrompt, injectGoalDisplay, cleanupGoalDisplay }