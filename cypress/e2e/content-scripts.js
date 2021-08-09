describe('Goal Prompt Popup', () => {
  it('When a goal is not set, and the user visits a page', () => {
    const user = cy;
    user.visit('/google');

    // the goal prompt should pop up
    user.get('[data-cy=goal-prompt-popup]').should('be.visible')

    // the user enters their goal
    user.get('[data-cy=goal-input]').type('Read Cypress docs so I write my tests')

    // the user submits their goal
    user.get('[data-cy=start-button]').click()

    // when a user submits their goal, the goal prompt should be deleted
    user.get('[data-cy=goal-prompt-popup]').should('not.exist')

    // when a user submits their goal, a display showing their goal should be visible
    user.get('[data-cy=goal-display]').should('be.visible')
  });
})
