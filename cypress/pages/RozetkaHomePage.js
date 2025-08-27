export class RozetkaHomePage {
  visit() {
    cy.visit('/');
  }
  search(query) {
    cy.waitUntilVisible('input[name="search"]');
    cy.pasteText('input[name="search"]', query);
    cy.get('input[name="search"]').type('{enter}');
    cy.waitForNetworkIdle(600);
  }
  openCart() {
    cy.clickIfVisible('css=[href*="cart"], [data-testid*="cart"]');
  }
}