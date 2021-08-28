describe('Goal Prompt Display', () => {
  context('A goal is set and the user visits a page', () => {
    beforeEach(() => {
      cy.setExtensionState({goal: 'Learn just enough from Cypress docs so I can write my tests'})

      cy.visit('/turtle')
    })

    it('user sees goal they set', () => {
      cy.get('[data-cy=goal-display]').should('be.visible')

      cy.get('[data-cy=goal-display]').should('contain', 'Learn just enough from Cypress docs so I can write my tests')
    })

    it('user can scroll the page', () => {
      //Without the wait, Cypress will check the below assertion and succeed, 
      //without retrying and failing once the class is added.
      cy.wait(500)

      cy.get('html').should('not.have.class', 'u-disable-scrolling')
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

    it('user clicks retract button to rectract the display to the left', () => {
      cy.get('[data-cy=retract-button]').click()

      cy.get('[data-cy=goal-display]').should('have.class', 'display--retracted')

      cy.get('[data-cy=retract-button]').click()

      cy.get('[data-cy=goal-display]').should('not.have.class', 'display--retracted')
    });
  });
});
