import './commands'

before(() => {
  cy.reloadExtension()
})

beforeEach(() => {
  cy.resetExtensionState()
})