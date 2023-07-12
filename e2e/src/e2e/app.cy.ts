describe('AppComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the header image', () => {
    cy.get('header img').should('be.visible');
  });

  it('should display job listings', () => {
    cy.get('main .container.card').should('have.length.greaterThan', 0);
  });

  it('should display job details when a job is clicked', () => {
    cy.get('main .container.card').first().click();
    cy.get('.job-details').should('be.visible');
  });
});
