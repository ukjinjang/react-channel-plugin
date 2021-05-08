describe('Booting', () => {
  it('should contains "react-channel-plugin" as title', () => {
    cy.visit('/');
    cy.get('h1').should('contain.text', 'react-channel-plugin');
  });

  it('should boot plugin, when `boot` called', () => {
    cy.get('button[data-cy="action-button-boot"]').click();
    cy.get('[data-ch-testid="launcher"]').should('exist');
  });

  it('should shutdown plugin, when `shutdown` called', () => {
    cy.get('button[data-cy="action-button-shutdown"]').click();
    cy.get('[data-ch-testid="launcher"]').should('not.exist');
  });

  it('should boot plugin, when `boot` called again', () => {
    cy.get('button[data-cy="action-button-boot"]').click();
    cy.get('[data-ch-testid="launcher"]').should('exist');
  });

  it('should boot plugin automatically, when `autoBoot` prop provided as `true`', () => {
    cy.visit({ url: '/', qs: { autoboot: true } });
    cy.get('[data-ch-testid="launcher"]').should('exist');
  });
});
