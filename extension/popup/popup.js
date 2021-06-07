const submitButton = document.getElementById('submit-button');
const completeButton = document.getElementById('complete-button');
const interuptButton = document.getElementById('interupt-button');
const form = document.getElementById('form');

function getFormData(event, name) {
  event.preventDefault();
  const formData = new FormData(form);
  return formData.get(name);
}

function setDataToStorage(data) {
  chrome.storage.local.set(data);
}

function getFormDataAndSetGoalToStorage(event) {
  const data = { goal: getFormData(event, 'goal') };
  setDataToStorage(data);
}

function removeGoalFromStorage() {
  chrome.storage.local.remove('goal');
}

function hideElementToggle(elementId) {
  return () => document.getElementById(elementId).classList.toggle('u-hide');
}

submitButton.addEventListener('click', hideElementToggle('form-container'), true);
submitButton.addEventListener('click', hideElementToggle('buttons-container'), true);
submitButton.addEventListener('click', getFormDataAndSetGoalToStorage, true);

completeButton.addEventListener('click', hideElementToggle('form-container'), true);
completeButton.addEventListener('click', hideElementToggle('buttons-container'), true);
completeButton.addEventListener('click', removeGoalFromStorage, true);

interuptButton.addEventListener('click', hideElementToggle('form-container'), true);
interuptButton.addEventListener('click', hideElementToggle('buttons-container'), true);
interuptButton.addEventListener('click', removeGoalFromStorage, true);

chrome.storage.local.get(['goal'], ({ goal }) => {
  if (goal) {
    hideElementToggle('form-container')();
  } else {
    hideElementToggle('buttons-container')();
  }
});
