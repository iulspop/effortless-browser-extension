export function injectFont(atFontFaceStyle) {
  let stylesheet = document.createElement('style')
  stylesheet.setAttribute('type', 'text/css')
  stylesheet.innerText = atFontFaceStyle
  document.head.appendChild(stylesheet)
}
