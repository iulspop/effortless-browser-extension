export function createGoalPrompt() {
  const prompt = `
    <div id="indistractable-extension">
      <div class="background"></div>
      <div class="prompt">
        <form class="form">
          <div class="question-1"><label class="form__label" for="ie-goal">What outcome do you seek?</label></div>
          <div class="question-2 u-hidden"><label class="form__label" for="ie-time">How much time to hit that target?</label></div>
          <div class="form__input-container">
            <div class="question-1"><input class="form__input" type="text" id="ie-goal" name="goal"></div>
            <div class="question-2 u-hidden"><input class="form__input" type="number" id="ie-time" name="time"></div>
            <button class="form__button" alt="Continue to next question or complete form">
              <svg class="form__button__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg>
            </button>
          </div>
          <p class="form__question-numberer">question <span class="form__question-numberer__number">1  /  2</span></p>
        </form>
      </div>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', prompt)

  document.querySelector('html').classList.toggle('u-disable-scrolling')
  document.querySelector('#indistractable-extension [name="goal"]').focus()

  document.querySelector('#indistractable-extension .form__button')
          .addEventListener('click', nextQuestion(), true)
}

function nextQuestion() {
  let step = 1;
  return (event) => {
    event.preventDefault();

    if (step === 1) {
      document.querySelectorAll('.question-1').forEach(node => node.classList.toggle('u-hidden'))
      document.querySelectorAll('.question-2').forEach(node => node.classList.toggle('u-hidden'))
      document.querySelector('.question-2 .form__input').focus()
      const numberer = document.querySelector('.form__question-numberer__number')
      numberer.textContent = numberer.textContent.replace('1', '2')
    }

    if (step === 2) {
      getFormDataAndSendMessage()
    }

    step++
  }
}

function getFormDataAndSendMessage() {
  const form = document.querySelector('#indistractable-extension .form')

  const formData = new FormData(form)
  const userGoal = formData.get('goal')
  if (typeof userGoal !== "string") { throw new Error('Failed to get form data') }

  const data = {goalSet: true, goal: userGoal}
  chrome.runtime.sendMessage(data)
}
