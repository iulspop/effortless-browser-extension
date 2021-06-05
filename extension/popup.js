const submitButton = document.getElementById("goal-submit-button"),
      form = document.getElementById("goal-form");

let setGoalToStorage = (event) => {
  event.preventDefault();

  let formData = new FormData(form);
  let goal = formData.get("goal");

  chrome.storage.local.set({goal: goal});

  chrome.runtime.sendMessage({goalSet: true});
};

submitButton.addEventListener("click", setGoalToStorage, true);
