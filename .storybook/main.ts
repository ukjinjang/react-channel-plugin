import fs from 'fs-extra';
import path from 'path';
import postcss from 'postcss';

/**
 * Main configurations for storybook.
 * - ref: https://storybook.js.org/docs/react/configure/overview
 */
export default {
  /**
   * Globs for storybook files.
   * - ref: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#correct-globs-in-mainjs
   */
  stories: ['../src/*.stories.tsx'],

  /**
   * Storybook addons
   * Prev from `.storybook/addons.js` which is deprecated.
   */
  addons: [
    //
    // === addons ===
    //

    /**
     * Curated collection of addons to bring out the best of Storybook.
     * - ref https://github.com/storybookjs/storybook/tree/master/addons/essentials
     */
    {
      name: '@storybook/addon-essentials',
      options: {
        // Disable `@storybook/addon-controls` from essentials.
        // - ref: https://github.com/storybookjs/storybook/tree/next/addons/controls#how-will-this-replace-addon-knobs
        // - TODO: migrate addon knobs to controls
        controls: false,
      },
    },

    /**
     * This addon is used to show stories source in the addon panel.
     * - ref: https://github.com/storybookjs/storybook/tree/master/addons/storysource
     */
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: fs.readJsonSync(
            path.join(__dirname, '..', '.prettierrc')
          ),
        },
      },
    },

    /**
     * The Storybook PostCSS addon can be used to run the PostCSS preprocessor against your stories in Storybook.
     * - ref: https://github.com/storybookjs/addon-postcss
     */
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: postcss,
        },
      },
    },

    /**
     * Helpful to make your UI components more accessible.
     * - ref: https://github.com/storybookjs/storybook/tree/master/addons/a11y
     */
    '@storybook/addon-a11y',

    /**
     * Allow to edit props dynamically using the Storybook UI.
     * - ref: https://github.com/storybookjs/storybook/tree/master/addons/knobs
     */
    '@storybook/addon-knobs',

    /**
     * Used to create links that navigate between stories in Storybook.
     * - ref: https://github.com/storybookjs/storybook/tree/master/addons/links
     */
    '@storybook/addon-links',

    /**
     * Brings Jest results in storybook.
     * - ref: https://github.com/storybookjs/storybook/tree/master/addons/jest
     */
    '@storybook/addon-jest',

    /**
     * A storybook addon to help better understand and debug performance
     * for React components
     * - ref: https://github.com/atlassian-labs/storybook-addon-performance
     */
    'storybook-addon-performance/register',
  ],

  /**
   * TypeScript configuration
   * - ref: https://storybook.js.org/docs/react/configure/typescript
   */
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
