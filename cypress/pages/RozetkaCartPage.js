// cypress/pages/RozetkaCartPage.js
export class RozetkaCartPage {
  assertHasItems() {
    cy.contains(/кошик|корзина/i).should('exist');
    cy.get('[data-testid*="cart"], .cart-product').should('exist');
  }
  removeAllItems() {
    cy.get('button, a').then($btns => {
      const btn = [...$btns].find(b => /видалити|remove/i.test(b.innerText));
      if (btn) cy.wrap(btn).click({ force: true });
    });
  }
}