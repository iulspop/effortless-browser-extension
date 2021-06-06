const submitButton = document.getElementById("submit-button"),
      completeButton = document.getElementById("complete-button"),
      interuptButton = document.getElementById("interupt-button"),
      form = document.getElementById("form");

function setGoalToStorage(event) {
  event.preventDefault();

  let formData = new FormData(form);
  let goal = formData.get("goal");

  chrome.storage.local.set({goal: goal});

  chrome.runtime.sendMessage({goalSet: true});
};

function showHideElementToggle(elementId) {
  return () => document.getElementById(elementId).classList.toggle('u-hide');
}

submitButton.addEventListener("click", setGoalToStorage, true);

submitButton.addEventListener("click", showHideElementToggle("form-container"), true);
submitButton.addEventListener("click", showHideElementToggle("buttons-container"), true);

completeButton.addEventListener("click", showHideElementToggle("form-container"), true);
completeButton.addEventListener("click", showHideElementToggle("buttons-container"), true);

interuptButton.addEventListener("click", showHideElementToggle("form-container"), true);
interuptButton.addEventListener("click", showHideElementToggle("buttons-container"), true);
