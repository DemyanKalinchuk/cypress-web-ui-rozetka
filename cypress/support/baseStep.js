// cypress/support/baseStep.js
// Unified action/wait helpers to keep tests clean & stable.

// ----- WAITERS -----
Cypress.Commands.add('waitUntilVisible', (selector, timeout = 10000) => {
  return cy.get(selector, { timeout }).should('be.visible');
});

Cypress.Commands.add('waitForEnabled', (selector, timeout = 10000) => {
  return cy.get(selector, { timeout }).should(($el) => {
    expect($el).to.be.visible;
    expect($el).not.to.be.disabled;
  });
});

Cypress.Commands.add('waitForGone', (selector, timeout = 10000) => {
  return cy.get('body', { timeout }).then(($body) => {
    if ($body.find(selector).length) {
      cy.get(selector, { timeout }).should('not.exist');
    } else {
      // already gone
      expect(true).to.eq(true);
    }
  });
});

// Lightweight "network idle" wait (client-side stabilization)
Cypress.Commands.add('waitForNetworkIdle', (ms = 500) => cy.wait(ms));

// ----- SCROLL -----
Cypress.Commands.add('scrollSmoothIntoView', (selector, opts = {}) => {
  const options = { duration: 400, offset: { top: -100, left: 0 }, ...opts };
  return cy.get(selector).scrollIntoView(options);
});

// ----- CLICK HELPERS -----
Cypress.Commands.add('clickIfVisible', (target) => {
  // target can be CSS "css=..." or a regex/text for cy.contains
  if (typeof target === 'string' && target.startsWith('css=')) {
    const css = target.replace(/^css=/, '');
    return cy.get(css).then(($el) => {
      if ($el.length && $el.is(':visible')) cy.wrap($el).click({ force: true });
    });
  }
  return cy.contains(target).then(($el) => {
    if ($el.length && $el.is(':visible')) cy.wrap($el).click({ force: true });
  });
});

Cypress.Commands.add('retryableClick', (selector, maxRetries = 3) => {
  let attempt = 0;
  function click() {
    attempt += 1;
    return cy
      .get(selector)
      .click({ force: true })
      .then(null, (err) => {
        if (attempt < maxRetries) {
          cy.wait(250);
          return click();
        }
        throw err;
      });
  }
  return click();
});

Cypress.Commands.add('clickByText', (selector, text, options = { exact: false }) => {
  const expr = options.exact ? new RegExp(`^\\s*${text}\\s*$`) : new RegExp(text, 'i');
  return cy.contains(selector, expr).click({ force: true });
});

// ----- INPUT / TYPING -----
Cypress.Commands.add('clearAndType', (selector, text, typeOptions = {}) => {
  return cy.get(selector).should('be.visible').clear({ force: true }).type(text, { delay: 0, force: true, ...typeOptions });
});

// Fast, deterministic text entry (bypasses flaky key events)
Cypress.Commands.add('fillInput', (selector, value) => {
  return cy.get(selector).should('be.visible').then(($el) => {
    const native = $el.get(0);
    native.focus();
    native.value = '';
    native.dispatchEvent(new Event('input', { bubbles: true }));
    native.value = value;
    native.dispatchEvent(new Event('input', { bubbles: true }));
  });
});

// Paste-like behavior (no clipboard permission prompts)
Cypress.Commands.add('pasteText', (selector, text) => {
  return cy.clearAndType(selector, text);
});

// OS shortcuts: e.g., cy.pressShortcut('{ctrl}', 'a') then 'v'
Cypress.Commands.add('pressShortcut', (mod, key) => {
  const combo = `${mod}+${key}`;
  return cy.focused().type(combo, { force: true });
});

// Copy text from input/textarea/value element into @copiedText alias
Cypress.Commands.add('copyFrom', (selector) => {
  return cy.get(selector).invoke('val').as('copiedText');
});

// ----- SELECT / DROPDOWNS -----
Cypress.Commands.add('selectByText', (selector, text) => {
  return cy.get(selector).then(($el) => {
    if ($el.is('select')) {
      cy.wrap($el).select(text);
    } else {
      cy.clickByText(selector, text);
    }
  });
});

// ----- URL / LOGGING / NETWORK -----
Cypress.Commands.add('assertUrlContains', (fragment) => {
  return cy.url().should('include', fragment);
});

Cypress.Commands.add('attachLog', (message) => cy.task('log', message));

// Intercept + wait helper: cy.interceptAndWait('GET', '**/api/items*', () => { action... })
Cypress.Commands.add('interceptAndWait', (method, urlPattern, actionCb, alias = 'req') => {
  cy.intercept(method, urlPattern).as(alias);
  actionCb();
  return cy.wait(`@${alias}`);
});