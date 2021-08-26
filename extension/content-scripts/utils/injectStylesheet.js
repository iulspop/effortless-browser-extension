export function injectStylesheet(stylesheetPath) {
  let stylesheet = document.createElement('link')
  stylesheet.setAttribute('rel', 'stylesheet')
  stylesheet.setAttribute('type', 'text/css')
  stylesheet.setAttribute('href', chrome.runtime.getURL(stylesheetPath))
  document.head.appendChild(stylesheet)
}
