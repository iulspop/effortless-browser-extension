function fetch_storage(keys) {
  return new Promise(resolve => {
    chrome.storage.local.get(keys, items => resolve(items))
  })
};

function createElement(type, props = {}, children = []) {
  let element = document.createElement(type);
  Object.assign(element, props);
  children.forEach(child => element.appendChild(child));
  return element;
};

(async function() {
  const goal = await fetch_storage(['goal']).then(items => items.goal);

  const description = createElement("p", {textContent: goal});
  description.style = `
  font-family: sans-serif;
  font-size: 20px;
  text-align: center;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

  const box = createElement("div", {}, [description]);
  box.style = `
  width: 120px;
  height: 60px;
  padding: 0;
  background-color: #FF91AF;
  border-radius: 7%;

  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 999999999999;
`

  document.body.appendChild(box);
})()