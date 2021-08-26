export function deleteGoalPrompt() {
  const bubble = document.getElementById("undistactable-extension-bubble");
  const background = document.getElementById("undistractable-extension-background");

  bubble?.remove();
  background?.remove();
  document.querySelector('html').classList.toggle('u-disable-scrolling')

  console.log('Deleted Goal Prompt!')
}
