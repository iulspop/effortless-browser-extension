function createElement(type, props = {}, children = []) {
  let element = document.createElement(type);
  Object.assign(element, props);
  children.forEach(child => element.appendChild(child));
  return element;
};

// Create popup programatically
function createSetGoal() {
  let label  = createElement("label", {for: "goal", textContent: "Set a goal:"});
  let input  = createElement("input", {type: "text", name: "goal", id:"goal"});
  let button = createElement("button", {id: "goal-submit-button", textContent: "Commit"});

  let form = createElement("form", {id: "goal-form"}, [label, input, button]);

  document.body.appendChild(form);
}

createSetGoal()

// Set event listener
function addSetGoalListener() {
  submitButton = document.getElementById("goal-submit-button"),
  form = document.getElementById("goal-form");

  function setGoalToStorage(event) {
    event.preventDefault();

    let formData = new FormData(form);
    let goal = formData.get("goal");

    chrome.storage.local.set({goal: goal});

    chrome.runtime.sendMessage({goalSet: true});
  };

  submitButton.addEventListener("click", setGoalToStorage, true);
}

addSetGoalListener()