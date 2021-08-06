import { insertCSS, removeCSS, insertCSSFile, removeCSSFile, executeScript } from './utils.js'

function injectGoalPrompt(tabId, frameIds) {
  insertCSS(
    tabId,
    `@font-face {
      font-family: "Lato";
      src: url(${chrome.runtime.getURL('fonts/Lato-Regular.ttf')}) format("truetype"),
           url(${chrome.runtime.getURL('fonts/Lato-Bold.ttf')}) format("truetype");
    }`,
    frameIds
  );
  insertCSSFile(
    tabId,
    'content-scripts/create-goal-prompt/create-goal-prompt.css',
    frameIds
  );
  executeScript(
    tabId,
    'content-scripts/create-goal-prompt/create-goal-prompt.js',
    frameIds
  );
}

function cleanupGoalPrompt(tabId, frameIds) {
  executeScript(
    tabId,
    'content-scripts/create-goal-prompt/delete-goal-prompt.js',
    frameIds
  );
  removeCSSFile(
    tabId,
    'content-scripts/create-goal-prompt/create-goal-prompt.css',
    frameIds
  );
  removeCSS(
    tabId,
    `@font-face {
      font-family: "Lato";
      src: url(${chrome.runtime.getURL('fonts/Lato-Regular.ttf')}) format("truetype"),
           url(${chrome.runtime.getURL('fonts/Lato-Bold.ttf')}) format("truetype");
    }`,
    frameIds
  );
}

function injectGoalDisplay(tabId, frameIds) {
  insertCSSFile(
    tabId,
    'content-scripts/create-goal-display/create-goal-display.css',
    frameIds
  );
  executeScript(
    tabId,
    'content-scripts/create-goal-display/create-goal-display.js',
    frameIds
  );
}

function cleanupGoalDisplay(tabId, frameIds) {
  executeScript(
    tabId,
    'content-scripts/create-goal-display/delete-goal-display.js',
    frameIds
  );
  removeCSSFile(
    tabId,
    'content-scripts/create-goal-display/create-goal-display.css',
    frameIds
  );
}

export { injectGoalPrompt, cleanupGoalPrompt, injectGoalDisplay, cleanupGoalDisplay }