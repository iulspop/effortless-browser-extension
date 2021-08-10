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

(async function setupGoalDisplay() {
  const sendCompleted = createSendMessageClosure({goalUpdate: "completed"})
  const sendInterrupted = createSendMessageClosure({goalUpdate: "interrupted"})
  const goal = await fetchStorage(['goal']).then((items) => items.goal);

  const description = createElement('p', { className: "display__description", textContent: goal });

  const buttonsDescription = createElement('p', { textContent: "Mark goal:" })

  const completeButton = createElement('button', { className: "display__button", textContent: "Complete" })
  completeButton.addEventListener('click', sendCompleted, true);

  const interuptButton = createElement('button', { className: "display__button", textContent: "Interrupted" })
  interuptButton.addEventListener('click', sendInterrupted, true);

  const buttons = createElement('div', {}, [buttonsDescription, completeButton, interuptButton])

  const goalDisplay = createElement('div', { className: "display" }, [description, buttons]);
  goalDisplay.setAttribute("data-cy", "goal-display");

  const extensionWrapper = createElement('div', { id: "undistractable-extension" }, [goalDisplay])
  document.body.appendChild(extensionWrapper);
})();
