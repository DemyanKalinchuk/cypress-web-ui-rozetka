export class RozetkaProductPage {
  addToCart() {
    cy.clickIfVisible(/купити|до кошика|в кошик/i);
    cy.waitForNetworkIdle(1000);
  }
  goToCartFromModal() {
    cy.clickIfVisible(/перейти до кошика|оформити замовлення/i);
  }
}