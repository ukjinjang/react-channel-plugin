export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getChannelIOIframeBody: () => Cypress.Chainable<JQuery<HTMLBodyElement>>;
    }
  }
}
