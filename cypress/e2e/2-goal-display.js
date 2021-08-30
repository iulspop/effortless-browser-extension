describe('Goal Prompt Display', () => {
  context('A goal is set and the user visits a page', () => {
    const goalText = 'Learn just enough from Cypress docs so I can write my tests'

    beforeEach(() => {
      cy.setExtensionState({goal: goalText})

      cy.visit('/turtle')
    })

    it('user marks goal complete and goal prompt appears', () => {
      cy.findByRole('button', {name: /complete/i}).click()

      cy.findByText(goalText).should('not.exist')
      cy.findByLabelText(/what outcome do you seek?/i).should('be.visible')
    });

    it('user marks goal interupted and goal prompt appears', () => {
      cy.findByRole('button', {name: /interrupt/i}).click()

      cy.findByText(goalText).should('not.exist')
      cy.findByLabelText(/what outcome do you seek?/i).should('be.visible')
    });

    it('user can scroll the page', () => {
      // Covers a bug where the scrolling is disabled when it shouldn't be

      // When Cypress checks if there's not the class, it succeeds.
      // However, if it retried, it would fail after the class is added.
      // The wait gives a window for the class to be added and for the test to fail.
      // It avoids false positives.
      cy.wait(500)
      cy.get('html').should('not.have.class', 'u-disable-scrolling')
    })
  });
});
