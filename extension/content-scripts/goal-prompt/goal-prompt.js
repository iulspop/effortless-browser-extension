import { createGoalPrompt } from './utils/create-goal-prompt.js'
import { deleteGoalPrompt } from './utils/delete-goal-prompt.js'

let goalPrompt = {
  activated: false,
  activate() {
    createGoalPrompt()
    this.activated = true
  },
  deactivate() {
    deleteGoalPrompt()
    this.activated = false
  }
}

export { goalPrompt }
