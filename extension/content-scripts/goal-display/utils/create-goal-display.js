export function createGoalDisplay(goal) {
  const display = `
    <div id="indistractable-extension">
      <div class="display" data-testid="goal-display">
        <p class="display__description">${goal}</p>
        <div>
          <button class="display__button" data-testid="complete-button">Complete</button>
          <button class="display__button" data-testid="interupt-button">Interrupted</button>
        </div>
      </div>
      <div class="time-bubble" data-testid="time-display">
        <time class="time-bubble__timer">
          <span id="minutes">99</span>:<span id="seconds">99</span>
        </time>
      </div>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', display)

  document.querySelector('[data-testid="complete-button"]')
          .addEventListener('click', send({goalStatus: true, status: "completed"}), true)

  document.querySelector('[data-testid="interupt-button"]')
          .addEventListener('click', send({goalStatus: true, status: "interrupted"}), true)
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
