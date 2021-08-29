describe('Goal Prompt Popup', () => {
  context('A goal is not set and the user visits a page', () => {
    beforeEach(() => {
      cy.visit('/turtle');
    })

    it('user sees the goal prompt pop up and enters their goal and time, the prompt disappear and the goal display appears', () => {
      cy.findByLabelText(/what outcome do you seek?/i)
        .type('Learn just enough from Cypress docs so I can write my tests')

      cy.get('#indistractable-extension').findByRole('button').click()

      cy.findByLabelText(/how much time to hit that target?/i)
        .type('15')

      cy.get('#indistractable-extension').findByRole('button').click()

      cy.findByText('Learn just enough from Cypress docs so I can write my tests')
        .should('be.visible')
    });

    it('user cannot scroll the page', () => {
      cy.get('html').should('have.class', 'u-disable-scrolling')
    })
  })
})
