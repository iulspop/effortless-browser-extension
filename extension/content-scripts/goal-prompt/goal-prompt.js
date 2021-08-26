import { createGoalPrompt } from './utils/create-goal-prompt.js'
import { deleteGoalPrompt } from './utils/delete-goal-prompt.js'

let goalPrompt = {
  create: createGoalPrompt,
  delete: deleteGoalPrompt
}

export { goalPrompt }
