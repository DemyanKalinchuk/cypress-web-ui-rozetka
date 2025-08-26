// cypress/support/baseTest.js
const NETWORK_IDLE_MS = 500;

Cypress.Commands.add('waitForNetworkIdle', (ms = NETWORK_IDLE_MS, pattern = /./) => {
  // Simple idle wait – extend as needed
  cy.wait(ms);
});

beforeEach(() => {
  cy.viewport(1440, 900);
  cy.on('uncaught:exception', () => false);
});

afterEach(function () {
  if (this.currentTest && this.currentTest.state === 'failed') {
    const name = (this.currentTest.titlePath && this.currentTest.titlePath()) || [];
    cy.screenshot(name.join(' -- ') || 'failed', { capture: 'runner' });
  }
});