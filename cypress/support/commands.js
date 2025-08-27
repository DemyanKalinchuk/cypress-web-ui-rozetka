<reference types="cypress" />
Cypress.Commands.add('byCy', (value) => cy.get(`[data-cy="${value}"]`));
Cypress.Commands.add('logToFile', (message) => cy.task('log', message));