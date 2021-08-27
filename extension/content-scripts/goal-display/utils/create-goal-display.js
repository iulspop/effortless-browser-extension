export function createGoalDisplay(goal) {
  const display = `
    <div id="indistractable-extension">
      <div class="display" data-cy="goal-display">
        <p class="display__description">${goal}</p>
        <div>
          <button class="display__button" data-cy="complete-button">Complete</button>
          <button class="display__button" data-cy="interupt-button">Interrupted</button>
        </div>
        <button class="display__retract-button" data-cy="retract-button">&lt;&lt;</button>
      </div>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', display)

  document.querySelector('[data-cy="complete-button"]')
          .addEventListener('click', send({goalStatus: true, status: "completed"}), true);

  document.querySelector('[data-cy="interupt-button"]')
          .addEventListener('click', send({goalStatus: true, status: "interrupted"}), true);

  const goalDisplay = document.querySelector('#indistractable-extension .display')
  const retractButton = document.querySelector('[data-cy="retract-button"]')
  retractButton.addEventListener('click', alternateSign(retractButton), true)
  retractButton.addEventListener('click', toggleClass(goalDisplay, "display--retracted"), true)
}

function sendMessage(data) {
  chrome.runtime.sendMessage(data);
}

function send(data) {
  return () => sendMessage(data);
}

function toggle(node, klass) {
  node.classList.toggle(klass)
}

function toggleClass(node, klass) {
  return () => toggle(node, klass)
}

function alternateSign(node) {
  return () => { node.textContent === "<<" ? node.textContent = ">>" : node.textContent = "<<" }
}
