import { createGoalDisplay } from './utils/create-goal-display.js'
import { deleteGoalDisplay } from './utils/delete-goal-display.js'

let goalDisplay = {
  create: createGoalDisplay,
  delete: deleteGoalDisplay
}

export { goalDisplay }
