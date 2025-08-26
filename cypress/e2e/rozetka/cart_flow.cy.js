// cypress/e2e/rozetka/cart_flow.cy.js
import { RozetkaHomePage } from '../../pages/RozetkaHomePage';
import { RozetkaSearchResultsPage } from '../../pages/RozetkaSearchResultsPage';
import { RozetkaProductPage } from '../../pages/RozetkaProductPage';
import { RozetkaCartPage } from '../../pages/RozetkaCartPage';

describe('Rozetka: Cart flow', () => {
  const home = new RozetkaHomePage();
  const results = new RozetkaSearchResultsPage();
  const product = new RozetkaProductPage();
  const cart = new RozetkaCartPage();

  it('add product to cart and open cart', () => {
    home.visit();
    home.search('Навушники');
    results.openFirstProduct();
    product.addToCart();
    product.goToCartFromModal();
    cart.assertHasItems();
  });
});