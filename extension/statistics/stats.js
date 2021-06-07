const spanCompletedGoals = document.getElementById('completed-goals');
const spanInteruptedGoals = document.getElementById('interupted-goals');
const spanDistractionsCount = document.getElementById('ditractions-count');

const keys = ['completedGoalsCount', 'interuptedGoalsCount', 'distractionsCount'];
chrome.storage.local.get(keys, (items) => {
  spanCompletedGoals.textContent = items.completedGoalsCount;
  spanInteruptedGoals.textContent = items.interuptedGoalsCount;
  spanDistractionsCount.textContent = items.distractionsCount;
});
