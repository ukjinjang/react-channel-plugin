describe('Plugin APIs', () => {
  beforeEach(() => {
    cy.visit({ url: '/', qs: { autoboot: true } });
  });

  it('should show plugin messenger, when `showMessenger` called', () => {
    cy.get('[data-ch-testid="launcher"]').click();

    cy.get('button[data-cy="action-button-showMessenger"]').click();

    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="lounge"]')
      .should('contain.text', 'Channel Talk');
  });

  it('should hide plugin messenger, when `hideMessenger` called', () => {
    cy.get('[data-ch-testid="launcher"]').click();

    cy.get('button[data-cy="action-button-hideMessenger"]').click();

    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="lounge"]')
      .should(el => Cypress.dom.isHidden(el));

    cy.get('[data-ch-testid="launcher"]').should('exist');
  });

  it('should open chatroom of plugin messenger, when `openChat` called', () => {
    cy.get('[data-ch-testid="launcher"]').click();

    cy.get('button[data-cy="action-button-openChat"]').click();

    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="user-chat"]')
      .should('contain.text', 'Welcome! How can I help you today?')
      .find('textarea[data-ch-testid="messenger-footer-text-area"]')
      .should('exist');
    // .should('have.value', 'Hi, this is a test message!');
  });

  it('should change user profile of plugin messenger, when `updateUser` called', () => {
    cy.get('[data-ch-testid="launcher"]').click();

    cy.getChannelIOIframeBody().find('a[href="/setting"]').click();

    cy.get('button[data-cy="action-button-updateUser"]').click();

    cy.getChannelIOIframeBody()
      .find('[data-testid="setting-profile-contact-email"]')
      .invoke('text')
      .then(email1 => {
        cy.get('button[data-cy="action-button-updateUser"]').click();

        cy.wait(1000);

        cy.getChannelIOIframeBody()
          .find('[data-testid="setting-profile-contact-email"]')
          .invoke('text')
          .then(email2 => {
            expect(email1).not.to.equal(email2);

            cy.get('button[data-cy="action-button-updateUser"]').click();

            cy.wait(1000);

            cy.getChannelIOIframeBody()
              .find('[data-testid="setting-profile-contact-email"]')
              .invoke('text')
              .then(email3 => {
                expect(email2).not.to.equal(email3);
              });
          });
      });
  });

  it('should hide launcher button of plugin messenger, when `hideChannelButton` called', () => {
    cy.get('[data-ch-testid="launcher"]').should(el =>
      Cypress.dom.isVisible(el)
    );

    cy.get('button[data-cy="action-button-hideChannelButton"]').click();

    cy.get('[data-ch-testid="launcher"]').should(el =>
      Cypress.dom.isHidden(el)
    );
  });

  it('should show launcher button of plugin messenger, when `showChannelButton` called', () => {
    cy.get('[data-ch-testid="launcher"]').should(el =>
      Cypress.dom.isHidden(el)
    );

    cy.get('button[data-cy="action-button-showChannelButton"]').click();

    cy.get('[data-ch-testid="launcher"]').should(el =>
      Cypress.dom.isVisible(el)
    );
  });

  it('should show plugin messenger, when custom launcher clicked which rendered after plugin booted', () => {
    cy.get('[data-cy="custom-test-launcher"]').click();

    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="lounge"]')
      .should('contain.text', 'Channel Talk');
  });
});
