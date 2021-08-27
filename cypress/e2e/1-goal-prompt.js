describe('Goal Prompt Popup', () => {
  context('A goal is not set and the user visits a page', () => {
    beforeEach(() => {
      cy.visit('/google');
    })

    it('user sees the goal prompt pop up and enters their goal, the prompt disappear and the goal display appears', () => {
      cy.get('[data-cy=goal-prompt-popup]').should('be.visible')

      cy.get('[data-cy=goal-input]').type('Learn just enough from Cypress docs so I can write my tests')
      cy.get('[data-cy=start-button]').click()

      cy.get('[data-cy=goal-prompt-popup]').should('not.exist')
      cy.get('[data-cy=goal-display]').should('be.visible')
    });

    it('user cannot scroll the page', () => {
      cy.get('html').should('have.class', 'u-disable-scrolling')
    })
  })
})
