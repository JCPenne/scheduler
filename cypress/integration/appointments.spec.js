describe('Appointments', () => {
  beforeEach(() => {
    cy.request('get', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  });
  it('books an appointment', () => {
    cy.get('[alt="Add"]')
      .first()
      .click()
      .get('input')
      .type('Lydia Miller-Jones')
      .get('.interviewers__item')
      .first()
      .click()
      .get('.button--confirm')
      .click();

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });
  it('edits an appointment', () => {
    cy.get('[alt="Edit"]')
      .first()
      .click({ force: true })
      .get('[alt="Tori Malcolm"]')
      .click()
      .get('[data-testid="student-name-input"]')
      .clear()
      .type('Lydia Miller-Jones')
      .get('.button--confirm')
      .click();

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });
  it.only('cancels an interview', () => {
    cy.get('[alt="Delete"]').click({ force: true });
    cy.get('.button--danger').contains('Confirm').click();

    cy.contains('Deleting');
    cy.contains('Deleting').should('not.exist');
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
