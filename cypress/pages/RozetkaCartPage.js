export class RozetkaCartPage {
  assertHasItems() {
    cy.contains(/кошик|корзина/i).should('exist');
    cy.get('[data-testid*="cart"], .cart-product').should('exist');
  }
  removeAllItems() {
    cy.clickIfVisible(/видалити|remove/i);
  }
}