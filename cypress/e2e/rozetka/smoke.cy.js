// cypress/e2e/rozetka/smoke.cy.js
import { RozetkaHomePage } from '../../pages/RozetkaHomePage';
import { RozetkaSearchResultsPage } from '../../pages/RozetkaSearchResultsPage';

describe('Rozetka: Smoke', () => {
  const home = new RozetkaHomePage();
  const results = new RozetkaSearchResultsPage();

  it('opens homepage and searches for iPhone 15', () => {
    home.visit();
    home.search('iPhone 15');
    results.assertResultsContain('iPhone');
  });
});