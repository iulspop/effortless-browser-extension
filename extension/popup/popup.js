const submitButton = document.getElementById('submit-button');
const completeButton = document.getElementById('complete-button');
const interuptButton = document.getElementById('interupt-button');
const distractionButton = document.getElementById('distraction-button');
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

function incrementValueInStorage(key) {
  chrome.storage.local.get(key, () => {
    if (items[key] == null) {
      setDataToStorage({ key: 0 });
    } else {
      setDataToStorage({ key: items[key] + 1 });
    }
  });
}

function createIncrementValueClosure(key) {
  return () => incrementValueInStorage(key);
}

const countUpCompletedGoals = createIncrementValueClosure('completedGoalsCount');
const countUpInteruptedGoals = createIncrementValueClosure('interuptedGoalsCount');
const countUpDistractions = createIncrementValueClosure('distractionsCount');

submitButton.addEventListener('click', hideElementToggle('form-container'), true);
submitButton.addEventListener('click', hideElementToggle('buttons-container'), true);
submitButton.addEventListener('click', getFormDataAndSetGoalToStorage, true);

completeButton.addEventListener('click', hideElementToggle('form-container'), true);
completeButton.addEventListener('click', hideElementToggle('buttons-container'), true);
completeButton.addEventListener('click', removeGoalFromStorage, true);
completeButton.addEventListener('click', countUpCompletedGoals, true);

interuptButton.addEventListener('click', hideElementToggle('form-container'), true);
interuptButton.addEventListener('click', hideElementToggle('buttons-container'), true);
interuptButton.addEventListener('click', removeGoalFromStorage, true);
interuptButton.addEventListener('click', countUpInteruptedGoals, true);

distractionButton.addEventListener('click', countUpDistractions, true);

chrome.storage.local.get(['goal'], ({ goal }) => {
  if (goal) {
    hideElementToggle('form-container')();
  } else {
    hideElementToggle('buttons-container')();
  }
});
