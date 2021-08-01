import createElement from './create-element.js'

(function createGoalPrompt() {
  const label = createElement('label', { textContent: "What will you accomplish during this visit?" });
  const input = createElement('input');
  const item = createElement('div', {}, [label, input]);
  const form = createElement('form', {}, [item]);
  const bubble = createElement('div', {}, [form]);
  bubble.style = `
    width: 350px;
    height: 350px;
    padding: 50px;
    background-color: #FF91AF;
    border-radius: 50%;
    position: fixed;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    z-index: 999;

    display: flex;
    flex-direction: column;

    font-family: sans-serif;
    text-align: center;
  `;

  document.body.appendChild(bubble);
})();
