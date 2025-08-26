// cypress/pages/RozetkaHomePage.js
export class RozetkaHomePage {
  visit() {
    cy.visit('/');
  }
  search(query) {
    cy.get('input[name="search"]').should('be.visible').clear().type(query).type('{enter}');
  }
  openCart() {
    cy.get('[href*="cart"], [data-testid*="cart"]').first().click({ force: true });
  }
}