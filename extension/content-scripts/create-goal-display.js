function createElement(type, props = {}, children = []) {
  const element = document.createElement(type);
  Object.assign(element, props);
  children.forEach((child) => element.appendChild(child));
  return element;
}

(async function createGoalDisplay() {
  const description = createElement('p', { textContent: "Your goal:" });
  description.style = `
    font-family: sans-serif !important;
    font-size: 20px !important;
    line-height: 1 !important;
    padding: 0 !important;
    margin: 0 !important;
    text-align: center;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `;

  const box = createElement('div', { id: 'boxturtle' }, [description]);
  box.style = `
    width: 100vw;
    height: 60px;
    padding: 0;
    background-color: #FF91AF;

    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 999999999999;
  `;

  document.body.appendChild(box);
})();
