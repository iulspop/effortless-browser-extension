describe('Goal Prompt Display', () => {
  context('A goal is set and the user visits a page', () => {
    beforeEach(() => {
      cy.setExtensionState({goal: 'Learn just enough from Cypress docs so I can write my tests'})

      cy.visit('/google')
    })

    it('user sees goal they set', () => {
      cy.get('[data-cy=goal-display]').should('be.visible')

      cy.get('[data-cy=goal-display]').should('contain', 'Learn just enough from Cypress docs so I can write my tests')
    })

    it('user marks goal complete and goal prompt appears', () => {
      cy.get('[data-cy=complete-button]').click()

      cy.get('[data-cy=goal-display]').should('not.exist')
      cy.get('[data-cy=goal-prompt-popup]').should('be.visible')
    });

    it('user marks goal interupted and goal prompt appears', () => {
      cy.get('[data-cy=interupt-button]').click()

      cy.get('[data-cy=goal-display]').should('not.exist')
      cy.get('[data-cy=goal-prompt-popup]').should('be.visible')
    });
  });
});
