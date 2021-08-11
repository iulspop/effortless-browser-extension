import createElement from '../utils/createElement.js'

function fetchStorage(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (items) => resolve(items));
  });
}

function sendMessage(data) {
  chrome.runtime.sendMessage(data);
}

function createSendMessageClosure(data) {
  return () => sendMessage(data);
}

function toggleClass(node, klass) {
  node.classList.toggle(klass)
}

function createToggleClassClosure(node, klass) {
  return () => toggleClass(node, klass)
}

function createAlternateSignClosure(node) {
  return () => { node.textContent === "<<" ? node.textContent = ">>" : node.textContent = "<<" }
}

(async function setupGoalDisplay() {
  const sendCompleted = createSendMessageClosure({goalUpdate: "completed"})
  const sendInterrupted = createSendMessageClosure({goalUpdate: "interrupted"})
  const goal = await fetchStorage(['goal']).then((items) => items.goal);

  const description = createElement('p', { className: "display__description", textContent: goal });

  const completeButton = createElement('button', { className: "display__button", textContent: "Complete" })
  completeButton.setAttribute("data-cy", "complete-button");
  completeButton.addEventListener('click', sendCompleted, true);

  const interuptButton = createElement('button', { className: "display__button", textContent: "Interrupted" })
  interuptButton.addEventListener('click', sendInterrupted, true);
  interuptButton.setAttribute("data-cy", "interupt-button");

  const buttons = createElement('div', {}, [completeButton, interuptButton])

  const retractButton = createElement('button', { className: "display__retract-button", textContent: "<<" })
  retractButton.setAttribute("data-cy", "retract-button");
  retractButton.addEventListener('click', createAlternateSignClosure(retractButton), true)

  const goalDisplay = createElement('div', { className: "display" }, [description, buttons, retractButton]);
  goalDisplay.setAttribute("data-cy", "goal-display");

  retractButton.addEventListener('click', createToggleClassClosure(goalDisplay, "display--retracted"), true)

  const extensionWrapper = createElement('div', { id: "undistractable-extension" }, [goalDisplay])
  document.body.appendChild(extensionWrapper);
})();
