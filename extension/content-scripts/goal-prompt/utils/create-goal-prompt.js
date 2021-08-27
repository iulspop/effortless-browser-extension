export function createGoalPrompt() {
  const prompt = `
    <div id="indistractable-extension">
      <div class="background"></div>
      <div class="prompt" data-cy="goal-prompt-popup">
        <form class="form">
          <label class="form__label" for="goal">What outcome do you seek?</label>
          <input class="form__input" type="text" name="goal" data-cy="goal-input">
          <button class="form__button" data-cy="start-button">Go</button>
        </form>
      </div>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', prompt)

  document.querySelector('html').classList.toggle('u-disable-scrolling')
  document.querySelector('#indistractable-extension [name="goal"]').focus()

  const form   = document.querySelector('#indistractable-extension .form')
  const button = document.querySelector('#indistractable-extension .form__button')
  button.addEventListener('click', saveElements(getFormDataAndSendMessage, form), true);
}

function getFormDataAndSendMessage(event, form) {
  event.preventDefault();

  const formData = new FormData(form);
  const userGoal = formData.get('goal');
  if (typeof userGoal !== "string") { throw new Error('Failed to get form data') }

  const data = {goalSet: true, goal: userGoal};
  chrome.runtime.sendMessage(data);
}

const saveElements = (listener, ...elements) => event => listener(event, ...elements)
