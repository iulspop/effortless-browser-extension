function fetchStorage(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (items) => resolve(items));
  });
}

function createElement(type, props = {}, children = []) {
  const element = document.createElement(type);
  Object.assign(element, props);
  children.forEach((child) => element.appendChild(child));
  return element;
}

(async function setupGoalDisplay() {
  const goal = await fetchStorage(['goal']).then((items) => items.goal);

  const description = createElement(
    'p',
    { id: "undistractable-extension-goal-description", textContent: goal }
  );

  const box = createElement(
    'div',
    { id: "undistractable-extension-goal-display" },
    [description]
  );

  document.body.appendChild(box);
})();
