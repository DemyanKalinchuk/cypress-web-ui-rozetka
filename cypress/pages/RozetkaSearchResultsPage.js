export class RozetkaSearchResultsPage {
  assertResultsContain(text) {
    cy.get('rz-catalog-tile, .goods-tile').should('exist');
    cy.contains('.goods-tile__title, a.goods-tile__heading, a', text, { matchCase: false }).should('exist');
  }
  applyBrand(brand) {
    cy.contains('label', new RegExp(`^\s*${brand}\s*$`, 'i')).scrollIntoView().click({ force: true });
    cy.wait(800);
  }
  sortByCheapest() {
    cy.get('select, rz-sorter, [data-testid*="sort"]').first().then($el => {
      if ($el.is('select')) {
        cy.wrap($el).select(1);
      } else {
        cy.contains(/від дешевих до дорогих|дешеві/i).click({ force: true });
      }
    });
    cy.wait(1000);
  }
  openFirstProduct() {
    cy.get('a.goods-tile__heading, .goods-tile__title a, a[data-goods-id]').first().click({ force: true });
  }
}