export function createGoalDisplay(goal) {
  const display = `
    <div id="indistractable-extension">
      <div class="goal-bar">
        <p class="goal-bar__text">${goal}</p>
      </div>
      <div class="sidetab">
        <button class="sidetab__button">Complete</button>
        <button class="sidetab__button">Interrupt</button>
      </div>
      <div class="time-bubble">
        <time class="time-bubble__timer">
          <span id="minutes">99</span>:<span id="seconds">99</span>
        </time>
      </div>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', display)

  document.querySelector('.sidebar-buttons__button:first-child')
          .addEventListener('click', send({goalStatus: true, status: "completed"}), true)

  document.querySelector('.sidebar-buttons__button:last-child')
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
