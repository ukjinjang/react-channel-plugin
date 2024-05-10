describe('Plugin Events', () => {
  it('should emits `onBoot` event, when plugin booted', () => {
    cy.visit('/');

    cy.get('button[data-cy="action-button-boot"]').click();
    cy.get('[data-cy="event-console"]').should('include.value', '[onBoot]');
  });

  it('should emits `onShowMessenger` or `onHideMessenger` events, when plugin messenger toggled', () => {
    cy.visit({ url: '/', qs: { autoboot: true } });

    cy.wait(5000);

    cy.get('[data-ch-testid="launcher"]').click();
    cy.get('[data-cy="event-console"]').should(
      'include.value',
      '[onShowMessenger]'
    );

    cy.get('[data-ch-testid="launcher"]').click();
    cy.get('[data-cy="event-console"]').should(
      'include.value',
      '[onHideMessenger]'
    );
  });

  // it('should emits `onChatCreated` event, when new message sent via plugin messenger', () => {
  //   cy.visit({ url: '/', qs: { autoboot: true } });

  //   cy.get('[data-ch-testid="launcher"]').click();
  //   cy.getChannelIOIframeBody()
  //     .find('[data-ch-testid="new-chat-button"]')
  //     .click();

  //   cy.wait(5000);

  //   cy.get('[data-cy="event-console"]').should(
  //     'include.value',
  //     '[onChatCreated]'
  //   );
  // });

  it('should emits `onProfileChanged` event, when user profile changed via plugin messenger', () => {
    cy.visit({ url: '/', qs: { autoboot: true } });

    cy.get('[data-ch-testid="launcher"]').click();

    cy.getChannelIOIframeBody().find('a[href="/setting"]').click();
    cy.getChannelIOIframeBody().find('a[href="/setting/edit"]').click();

    const email = `${Math.random().toString(36).substring(2, 10)}@test.com`;

    cy.getChannelIOIframeBody().find('input[type="email"]').clear();
    cy.getChannelIOIframeBody().find('input[type="email"]').type(`010${email}`);

    cy.getChannelIOIframeBody().contains('button', 'Save').click();
    cy.get('[data-cy="event-console"]').should(
      'include.value',
      '[onFollowUpChanged]'
    );
    cy.get('[data-cy="event-console"]').should('include.value', email);
  });
});
