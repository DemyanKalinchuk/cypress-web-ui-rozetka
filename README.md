# Cypress Web UI — Rozetka Regression Suite

This version adds **BaseTest** and **BaseStep** layers and a ready-made regression suite against **https://rozetka.com.ua**.

## Layers
- **BaseTest** (`cypress/support/baseTest.js`): global hooks, viewport, `cy.waitForNetworkIdle()` placeholder, screenshot on failure.
- **BaseStep** (`cypress/support/baseStep.js`): action utilities — `pasteText`, `copyFrom`, `clickIfVisible`, `waitUntilVisible`, `scrollSmoothIntoView`.
- **Pages**: Rozetka POMs for Home, Search Results, Product, Cart.
- **Specs**: smoke, filters & sorting, cart flow, negative search.

## Run
```bash
npm ci
npm test
npm run report
npm run cypress:open
```