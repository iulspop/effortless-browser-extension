function createElement(type, props = {}, children = []) {
  const element = document.createElement(type);
  Object.assign(element, props);
  children.forEach((child) => element.appendChild(child));
  return element;
}

(function createGoalPrompt() {
  const label = createElement('label', { textContent: "What do you want to accomplish during your visit?" });
  const input = createElement('input');
  const item = createElement('div', {}, [label, input]);
  const form = createElement('form', {}, [item]);
  const button = createElement('button', { textContent: "Start goal-seeking"});
  const bubble = createElement('div', {id: "undistactable-extention-bubble"}, [form, button]);
  const background = createElement('div', {id: "undistractable-extension-background"});

  document.body.appendChild(background);
  document.body.appendChild(bubble);
})();

console.log('hi from content script!');
