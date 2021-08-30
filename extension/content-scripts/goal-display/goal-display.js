import { createGoalDisplay } from './utils/create-goal-display.js'
import { deleteGoalDisplay } from './utils/delete-goal-display.js'

let goalDisplay = {
  activate: createGoalDisplay,
  deactivate: deleteGoalDisplay
}

export { goalDisplay }
