// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@cypress/code-coverage/support';

beforeEach(() => {
  Cypress.Commands.add('getChannelIOIframeBody', () => {
    return cy
      .get('iframe[id="ch-plugin-script-iframe"]', { log: false })
      .its('0.contentDocument.body', { log: false })
      .should('not.be.empty')
      .then(body => cy.wrap(body as HTMLBodyElement, { log: false }));
  });
});
