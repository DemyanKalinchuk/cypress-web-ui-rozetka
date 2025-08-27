export class RozetkaSearchResultsPage {
  assertResultsContain(text) {
    cy.scrollSmoothIntoView('body');
    cy.contains('.goods-tile__title, a.goods-tile__heading, a', text, { matchCase: false }).should('exist');
  }

  applyBrand(brand) {
    cy.scrollSmoothIntoView('body');
    cy.clickByText('label', brand, { exact: true });
    cy.waitForNetworkIdle(800);
  }

  sortByCheapest() {
    cy.scrollSmoothIntoView('body');
    cy.get('select, rz-sorter, [data-testid*="sort"]').first().then(($el) => {
      if ($el.is('select')) {
        cy.selectByText($el, 'дешев'); // partial match; adjust if needed
      } else {
        cy.clickIfVisible(/від дешевих до дорогих|дешеві/i);
      }
    });
    cy.waitForNetworkIdle(1000);
  }

  openFirstProduct() {
    cy.scrollSmoothIntoView('a.goods-tile__heading, .goods-tile__title a, a[data-goods-id]');
    cy.retryableClick('a.goods-tile__heading, .goods-tile__title a, a[data-goods-id]');
  }
}