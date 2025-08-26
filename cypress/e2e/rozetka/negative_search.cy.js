// cypress/e2e/rozetka/negative_search.cy.js
import { RozetkaHomePage } from '../../pages/RozetkaHomePage';
describe('Rozetka: Negative search', () => {
  const home = new RozetkaHomePage();
  it('searches for a non-existing item', () => {
    home.visit();
    const gibberish = 'zxqv-not-real-12345';
    home.search(gibberish);
    cy.contains(/нічого не знайдено|нічого не найдено|no results/i).should('exist');
  });
});