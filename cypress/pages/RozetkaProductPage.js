// cypress/pages/RozetkaProductPage.js
export class RozetkaProductPage {
  addToCart() {
    cy.contains('button', /купити|до кошика|в кошик/i).first().click({ force: true });
    cy.wait(1000);
  }
  goToCartFromModal() {
    cy.contains(/перейти до кошика|оформити замовлення/i).first().click({ force: true });
  }
}