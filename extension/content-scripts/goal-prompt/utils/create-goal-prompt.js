function getFormDataAndSendMessage(event, form) {
  event.preventDefault();

  const formData = new FormData(form);
  const userGoal = formData.get('goal');
  if (typeof userGoal !== "string") { throw new Error('Failed to get form data') }
  const data = {goalSet: userGoal};

  chrome.runtime.sendMessage(data);
}

const saveElements = (listener, ...elements) => event => listener(event, ...elements)

export function createGoalPrompt() {
  const prompt = `
    <div id="undistractable-extension-background"></div>
    <div id="undistactable-extension-bubble" data-cy="goal-prompt-popup">
      <form id="undistactable-extension-form">
        <label id="undistractable-extension-label">What outcome do you seek?</label>
        <input id="undistractable-extension-input" type="text" name="goal" data-cy="goal-input">
        <button id="undistractable-extension-button" data-cy="start-button">Go</button>
      </form>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', prompt)

  document.querySelector('html').classList.toggle('u-disable-scrolling')
  document.querySelector('#undistractable-extension-input').focus()

  const form   = document.querySelector('#undistactable-extension-form')
  const button = document.querySelector('#undistractable-extension-button')
  button.addEventListener('click', saveElements(getFormDataAndSendMessage, form), true);
}
