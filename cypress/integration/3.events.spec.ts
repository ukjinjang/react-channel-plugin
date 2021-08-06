describe('Plugin Events', () => {
  it('should emits `onBoot` event, when plugin booted', () => {
    cy.visit('/');

    cy.get('button[data-cy="action-button-boot"]').click();
    cy.get('[data-cy="event-console"]').should('include.value', '[onBoot]');
  });

  it('should emits `onShowMessenger` or `onHideMessenger` events, when plugin messenger toggled', () => {
    cy.visit({ url: '/', qs: { autoboot: true } });

    cy.get('[data-ch-testid="launcher"]').click();
    cy.get('[data-cy="event-console"]').should(
      'include.value',
      '[onShowMessenger]'
    );

    cy.getChannelIOIframeBody().find('[data-ch-testid="close-icon"]').click();
    cy.get('[data-cy="event-console"]').should(
      'include.value',
      '[onHideMessenger]'
    );
  });

  it('should emits `onChatCreated` event, when new message sent via plugin messenger', () => {
    cy.visit({ url: '/', qs: { autoboot: true } });

    cy.get('[data-ch-testid="launcher"]').click();
    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="new-chat-button"]')
      .click();

    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="messenger-footer-text-area"]')
      .type('Hi, this is a test message.');
    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="messenger-footer-send-button"]')
      .click();
    cy.get('[data-cy="event-console"]').should(
      'include.value',
      '[onChatCreated]'
    );

    cy.getChannelIOIframeBody().find('[name="more-white"]').click();
    cy.getChannelIOIframeBody().contains('Leave the Chat').click();
    cy.getChannelIOIframeBody().contains('Got it').click();
  });

  it('should emits `onProfileChanged` event, when user profile changed via plugin messenger', () => {
    cy.visit({ url: '/', qs: { autoboot: true } });

    cy.get('[data-ch-testid="launcher"]').click();
    cy.getChannelIOIframeBody()
      .find('[data-ch-testid="settings-icon"]')
      .click();

    cy.getChannelIOIframeBody().contains('span', 'Edit').click();

    cy.wait(2000);

    const phonenum = Math.floor(Math.random() * 90000000) + 10000000;
    cy.getChannelIOIframeBody()
      .find('input[type="tel"]')
      .clear()
      .type(`010${phonenum}`);

    cy.getChannelIOIframeBody().contains('span', 'Save').click();
    cy.get('[data-cy="event-console"]').should(
      'include.value',
      '[onProfileChanged]'
    );
    cy.get('[data-cy="event-console"]').should('include.value', phonenum);
  });
});
