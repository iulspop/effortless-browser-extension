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
  const goal = await fetchStorage(['goal']).then((items) => items.goal);

  const description = createElement('p', { id: "undistractable-extension-goal-description", textContent: goal });

  const buttonsDescription = createElement('p', {textContent: "Mark goal:"})

  const completeButton = createElement('button', { id: "indistractable-extension-complete-button", textContent: "Complete"})
  const sendCompleted = createSendMessageClosure({goalUpdate: "completed"})
  completeButton.addEventListener('click', sendCompleted, true);

  const interuptButton = createElement('button', { id: "indistractable-extension-interupt-button", textContent: "Interrupted"})
  const sendInterrupted = createSendMessageClosure({goalUpdate: "interrupted"})
  interuptButton.addEventListener('click', sendInterrupted, true);

  const buttons = createElement('div', {}, [buttonsDescription, completeButton, interuptButton])

  const goalDisplay = createElement('div', { id: "undistractable-extension-goal-display" }, [description, buttons]);

  document.body.appendChild(goalDisplay);
})();
