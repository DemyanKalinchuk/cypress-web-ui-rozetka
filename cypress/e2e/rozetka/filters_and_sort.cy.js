// cypress/e2e/rozetka/filters_and_sort.cy.js
import { RozetkaHomePage } from '../../pages/RozetkaHomePage';
import { RozetkaSearchResultsPage } from '../../pages/RozetkaSearchResultsPage';

describe('Rozetka: Filters & Sorting', () => {
  const home = new RozetkaHomePage();
  const results = new RozetkaSearchResultsPage();

  it('search, filter by brand, sort by cheapest', () => {
    home.visit();
    home.search('Ноутбук');
    results.applyBrand('Lenovo');
    results.sortByCheapest();
    results.assertResultsContain('Lenovo');
  });
});