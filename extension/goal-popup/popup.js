const submitButton = document.getElementById('submit-button');
const completeButton = document.getElementById('complete-button');
const interuptButton = document.getElementById('interupt-button');
const distractionButton = document.getElementById('distraction-button');
const statsButton = document.getElementById('stats-button');
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
  document.getElementById(elementId).classList.toggle('u-hide');
}

function createHideElementToggleClosure(elementId) {
  return () => hideElementToggle(elementId);
}

function fetchStorage(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (items) => resolve(items));
  });
}

async function incrementValueInStorage(key) {
  const items = await fetchStorage([key]);
  let value = items[key] == null ? 1 : items[key] + 1;
  setDataToStorage({ [key]: value });
}

function createIncrementValueClosure(key) {
  return () => incrementValueInStorage(key);
}

function openExtensionPage(url) {
  const fullURL = chrome.runtime.getURL(url);

  function onGot(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      chrome.tabs.create({ url: fullURL });
    }
    window.close();
  }

  chrome.tabs.query({ url: fullURL }, onGot);
}

function openStats() {
  openExtensionPage('../goal-statistics/statistics.html');
}

const countUpCompletedGoals = createIncrementValueClosure('completedGoalsCount');
const countUpInteruptedGoals = createIncrementValueClosure('interuptedGoalsCount');
const countUpDistractions = createIncrementValueClosure('distractionsCount');
const toggleHideForm = createHideElementToggleClosure('form-container');
const toggleHideButtons = createHideElementToggleClosure('buttons-container');

submitButton.addEventListener('click', toggleHideForm, true);
submitButton.addEventListener('click', toggleHideButtons, true);
submitButton.addEventListener('click', getFormDataAndSetGoalToStorage, true);

completeButton.addEventListener('click', toggleHideForm, true);
completeButton.addEventListener('click', toggleHideButtons, true);
completeButton.addEventListener('click', removeGoalFromStorage, true);
completeButton.addEventListener('click', countUpCompletedGoals, true);

interuptButton.addEventListener('click', toggleHideForm, true);
interuptButton.addEventListener('click', toggleHideButtons, true);
interuptButton.addEventListener('click', removeGoalFromStorage, true);
interuptButton.addEventListener('click', countUpInteruptedGoals, true);

distractionButton.addEventListener('click', countUpDistractions, true);

statsButton.addEventListener('click', openStats);

chrome.storage.local.get(['goal'], ({ goal }) => {
  if (goal) {
    hideElementToggle('form-container');
  } else {
    hideElementToggle('buttons-container');
  }
});
