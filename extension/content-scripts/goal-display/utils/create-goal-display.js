export function createGoalDisplay(goal) {
  const display = `
    <div id="indistractable-extension">
      <div class="goal-bar u-fade-out">
        <p class="goal-bar__text">${goal}</p>
      </div>
      <div class="sidetab">
        <button class="sidetab__button">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          <span class="sidetab__button__label">Complete</span>
        </button>
        <button class="sidetab__button">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8v-5l9 9-9 9v-5h-12v-8h12zm12-4h-3v16h3v-16z"/></svg>
          <span class="sidetab__button__label">Interrupt</span>
        </button>
      </div>
      <div class="time-bubble">
        <time class="time-bubble__timer">
          <span id="minutes">99</span>:<span id="seconds">99</span>
        </time>
      </div>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', display)

  document.querySelector('.sidetab__button:first-child')
          .addEventListener('click', send({goalStatus: true, status: "completed"}), true)

  document.querySelector('.sidetab__button:last-child')
          .addEventListener('click', send({goalStatus: true, status: "interrupted"}), true)

  const goalBar = document.querySelector('.goal-bar')
  document.querySelector('.time-bubble').addEventListener('mouseenter', switchClass(goalBar, 'u-fade-in', 'u-fade-out'))
  document.querySelector('.time-bubble').addEventListener('mouseleave', switchClass(goalBar, 'u-fade-in', 'u-fade-out'))
}

function send(data) {
  return () => chrome.runtime.sendMessage(data);
}

function switchClass(node, firstClass, secondClass) {
  return () => {
    node.classList.contains(firstClass) ?
      node.className = node.className.replace(firstClass, secondClass) :
      node.className = node.className.replace(secondClass, firstClass)
  }
}
