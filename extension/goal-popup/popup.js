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

function hideElementToggle(elementId) {
  document.getElementById(elementId).classList.toggle('u-hide');
}

function createHideElementToggleClosure(elementId) {
  return () => hideElementToggle(elementId);
}

const toggleHideForm = createHideElementToggleClosure('form-container');
const toggleHideButtons = createHideElementToggleClosure('buttons-container');

submitButton.addEventListener('click', toggleHideForm, true);
submitButton.addEventListener('click', toggleHideButtons, true);
submitButton.addEventListener('click', getFormData, true);

completeButton.addEventListener('click', toggleHideForm, true);
completeButton.addEventListener('click', toggleHideButtons, true);

interuptButton.addEventListener('click', toggleHideForm, true);
interuptButton.addEventListener('click', toggleHideButtons, true);

let goal = false;

if (goal) {
  hideElementToggle('form-container');
} else {
  hideElementToggle('buttons-container');
}
