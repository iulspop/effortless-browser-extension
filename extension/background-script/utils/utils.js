function insertCSS(tabId, css) {
  chrome.scripting.insertCSS(
    {
      target: { tabId },
      css,
    }
  );
}

function removeCSS(tabId, css) {
  chrome.scripting.removeCSS(
    {
      target: { tabId },
      css,
    }
  );
}

function insertCSSFile(tabId, file) {
  chrome.scripting.insertCSS(
    {
      target: { tabId },
      files: [file],
    }
  );
}

function removeCSSFile(tabId, file) {
  chrome.scripting.removeCSS(
    {
      target: { tabId },
      files: [file],
    }
  );
}

function executeScript(tabId, file) {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: [file],
    }
  );
}

export { insertCSS, removeCSS, insertCSSFile, removeCSSFile, executeScript }