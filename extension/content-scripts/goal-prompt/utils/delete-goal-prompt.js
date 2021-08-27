export function deleteGoalPrompt() {
  document.querySelector("#indistractable-extension")?.remove()
  document.querySelector('html').classList.toggle('u-disable-scrolling')
}
