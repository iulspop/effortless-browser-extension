export function createGoalPrompt() {
  const prompt = `
    <div id="indistractable-extension">
      <div class="background"></div>
      <div class="prompt" data-cy="goal-prompt-popup">
        <form class="form">
          <label class="form__label" for="goal">What outcome do you seek?</label>
          <div class="form__input-container">
            <input class="form__input" type="text" name="goal" data-cy="goal-input">
            <button class="form__button" data-cy="start-button">
              <svg class="form__button__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg>
            </button>
          </div>
          <p class="form__question-numberer">question <span class="form__question-numberer__number">1  /  1</span></p>
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
