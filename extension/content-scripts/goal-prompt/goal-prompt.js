import { createGoalPrompt } from './utils/create-goal-prompt.js'
import { deleteGoalPrompt } from './utils/delete-goal-prompt.js'

let goalPrompt = {
  activated: false,
  create() {
    createGoalPrompt()
    this.activated = true
  },
  delete() {
    deleteGoalPrompt()
    this.activated = false
  }
}

export { goalPrompt }
