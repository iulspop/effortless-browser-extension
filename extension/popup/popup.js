const submitButton = document.getElementById("submit-button"),
      completeButton = document.getElementById("complete-button"),
      interuptButton = document.getElementById("interupt-button"),
      form = document.getElementById("form");

function setGoalToStorage(event) {
  event.preventDefault();

  let formData = new FormData(form);
  let goal = formData.get("goal");

  chrome.storage.local.set({goal: goal});
};

function hideElementToggle(elementId) {
  return () => document.getElementById(elementId).classList.toggle('u-hide');
}

function removeGoalFromStorage() {
  chrome.storage.local.remove("goal");
}

submitButton.addEventListener("click", hideElementToggle("form-container"), true);
submitButton.addEventListener("click", hideElementToggle("buttons-container"), true);
submitButton.addEventListener("click", setGoalToStorage, true);

completeButton.addEventListener("click", hideElementToggle("form-container"), true);
completeButton.addEventListener("click", hideElementToggle("buttons-container"), true);
completeButton.addEventListener("click", removeGoalFromStorage, true);

interuptButton.addEventListener("click", hideElementToggle("form-container"), true);
interuptButton.addEventListener("click", hideElementToggle("buttons-container"), true);
interuptButton.addEventListener("click", removeGoalFromStorage, true);

chrome.storage.local.get(['goal'], ({ goal }) => {
  if (goal) {
    hideElementToggle("form-container")()
  } else {
    hideElementToggle("buttons-container")()
  }
})