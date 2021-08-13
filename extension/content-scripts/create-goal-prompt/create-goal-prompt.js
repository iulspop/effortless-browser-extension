import createElement from '../utils/createElement.js'

function getFormDataAndSendMessage(event, form) {
  event.preventDefault();

  const formData = new FormData(form);
  const userGoal = formData.get('goal');
  if (typeof userGoal !== "string") { throw new Error('Failed to get form data') }
  const data = {goalSet: userGoal};

  chrome.runtime.sendMessage(data);
}

function saveElements(listener, ...elements) {
  return event => listener(event, ...elements);
}

(function createGoalPrompt() {
  const label = createElement('label', { id: "undistractable-extension-label", for:"undistractable-extension-input", textContent: "What outcome do you seek?" });
  const input = createElement('input', { id: "undistractable-extension-input", type:"text", name:"goal"});
  input.setAttribute("data-cy", "goal-input");
  const button = createElement('button', { id: "undistractable-extension-button", textContent: "Go"});
  button.setAttribute("data-cy", "start-button");

  const form = createElement('form', {id: "undistactable-extension-form"}, [label, input, button]);

  const getFormDataAndSendMessageClosure = saveElements(getFormDataAndSendMessage, form);
  button.addEventListener('click', getFormDataAndSendMessageClosure, true);

  const bubble = createElement('div', {id: "undistactable-extension-bubble"}, [form]);
  bubble.setAttribute("data-cy", "goal-prompt-popup");
  const background = createElement('div', {id: "undistractable-extension-background"});

  document.body.appendChild(background);
  document.body.appendChild(bubble);

  input.focus();
})();
