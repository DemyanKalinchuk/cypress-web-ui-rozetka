// cypress/support/baseStep.js
Cypress.Commands.add('pasteText', (selector, text) => {
  cy.get(selector).focus().invoke('val', '').then(() => {
    cy.get(selector).type(text, { delay: 0, force: true });
  });
});

Cypress.Commands.add('copyFrom', (selector) => {
  cy.get(selector).invoke('val').as('copiedText');
});

Cypress.Commands.add('clickIfVisible', (selectorOrText) => {
  if (selectorOrText.startsWith && selectorOrText.startsWith('css=')) {
    cy.get(selectorOrText.replace(/^css=/, '')).then($el => {
      if ($el.is(':visible')) cy.wrap($el).click({ force: true });
    });
  } else {
    cy.contains(selectorOrText).then($el => {
      if ($el.is(':visible')) cy.wrap($el).click({ force: true });
    });
  }
});

Cypress.Commands.add('waitUntilVisible', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

Cypress.Commands.add('scrollSmoothIntoView', (selector) => {
  cy.get(selector).scrollIntoView({ duration: 400, offset: { top: -100, left: 0 } });
});