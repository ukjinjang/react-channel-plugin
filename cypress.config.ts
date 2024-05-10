/* eslint-disable @typescript-eslint/no-var-requires */

import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:8090',
    specPattern: './cypress/e2e/**/*.cy.ts',
    supportFile: './cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
  },
  includeShadowDom: true,
  projectId: 'q8rekw',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
});
