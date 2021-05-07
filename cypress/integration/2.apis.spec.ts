describe('Plugin APIs', () => {
  it('should show plugin messenger, when `showMessenger` emits', () => {
    cy.visit({ url: '/', qs: { autoboot: true } });
    cy.get('button[data-cy="action-button-showMessenger"]').click();

    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="lounge"]')
      .should('contain.text', 'Channel.io');
  });

  it('should hide plugin messenger, when `hideMessenger` emits', () => {
    cy.get('button[data-cy="action-button-hideMessenger"]').click();

    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="lounge"]')
      .should('not.exist');

    cy.get('[data-ch-testid="launcher"]').should('exist');
  });

  it('should open chatroom of plugin messenger, when `openChat` emits', () => {
    cy.get('button[data-cy="action-button-openChat"]').click();

    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="user-chat"]')
      .should('contain.text', 'Welcome! How can I help you today?')
      .find('textarea[data-ch-testid="messenger-footer-text-area"]')
      .should('have.value', 'Hi, this is a test message!');
  });

  it('should back to lounge of plugin messenger, when `lounge` emits', () => {
    cy.get('button[data-cy="action-button-lounge"]').click();

    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="lounge"]')
      .should('exist');
  });

  it('should change user profile of plugin messenger, when `updateUser` emits', () => {
    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="settings-icon"]')
      .click();

    cy.getChannelIOIframeBody()
      .should('contain.text', 'Settings')
      .contains('span', 'Edit')
      .click();

    cy.getChannelIOIframeBody()
      .find('input[type="tel"]')
      .invoke('val')
      .then(tel1 => {
        cy.get('button[data-cy="action-button-updateUser"]').click();

        cy.wait(500);

        cy.getChannelIOIframeBody()
          .find('input[type="tel"]')
          .invoke('val')
          .then(tel2 => {
            expect(tel1).not.to.equal(tel2);

            cy.get('button[data-cy="action-button-updateUser"]').click();

            cy.wait(500);

            cy.getChannelIOIframeBody()
              .find('input[type="tel"]')
              .invoke('val')
              .then(tel3 => {
                expect(tel2).not.to.equal(tel3);
              });
          });
      });
  });

  it('should hide launcher button of plugin messenger, when `hideChannelButton` emits', () => {
    cy.reload();

    cy.get('[data-ch-testid="launcher"]').should('be.visible');

    cy.get('button[data-cy="action-button-hideChannelButton"]').click();

    cy.get('[data-ch-testid="launcher"]').should('not.be.visible');
  });

  it('should show launcher button of plugin messenger, when `showChannelButton` emits', () => {
    cy.get('[data-ch-testid="launcher"]').should('not.be.visible');

    cy.get('button[data-cy="action-button-showChannelButton"]').click();

    cy.get('[data-ch-testid="launcher"]').should('be.visible');
  });
});
