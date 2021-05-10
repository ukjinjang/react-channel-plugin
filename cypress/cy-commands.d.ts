export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getChannelIOIframeBody: () => Cypress.Chainable<HTMLElement>;
    }
  }
}
