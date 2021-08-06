function insertCSS(tabId, css) {
  chrome.scripting.insertCSS(
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

function openExtensionPage(url) {
  const fullURL = chrome.runtime.getURL(url);

  function onGot(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      chrome.tabs.create({ url: fullURL });
    }
    window.close();
  }

  chrome.tabs.query({ url: fullURL }, onGot);
}

function openStats() {
  openExtensionPage('../goal-statistics/statistics.html');
}

export { insertCSS, insertCSSFile, removeCSSFile, executeScript }