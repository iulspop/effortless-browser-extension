import './commands'

before(() => {
  cy.reloadExtension()
})

beforeEach(() => {
  cy.resetExtensionState()
})

afterEach(() => {
  cy.resetExtensionState()
})