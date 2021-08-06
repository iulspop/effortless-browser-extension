function insertCSS(tabId, css, frameIds) {
  chrome.scripting.insertCSS(
    {
      target: { tabId, frameIds },
      css,
    }
  );
}

function removeCSS(tabId, css, frameIds) {
  chrome.scripting.removeCSS(
    {
      target: { tabId, frameIds },
      css,
    }
  );
}

function insertCSSFile(tabId, file, frameIds) {
  chrome.scripting.insertCSS(
    {
      target: { tabId, frameIds },
      files: [file],
    }
  );
}

function removeCSSFile(tabId, file, frameIds) {
  chrome.scripting.removeCSS(
    {
      target: { tabId, frameIds },
      files: [file],
    }
  );
}

function executeScript(tabId, file, frameIds) {
  chrome.scripting.executeScript(
    {
      target: { tabId, frameIds },
      files: [file],
    }
  );
}

export { insertCSS, removeCSS, insertCSSFile, removeCSSFile, executeScript }