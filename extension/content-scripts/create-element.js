function createElement(type, props = {}, children = []) {
  const element = document.createElement(type);
  Object.assign(element, props);
  children.forEach((child) => element.appendChild(child));
  return element;
}

export default createElement