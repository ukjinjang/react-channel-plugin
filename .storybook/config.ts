///<reference path="../node_modules/@types/webpack-env/index.d.ts" />
///<reference path="../typings/storybook.d.ts"/>
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '!style-loader!css-loader!./style.css';

const req = require.context('../src', true, /\.stories\.(js|ts)x?$/);

// Add default parameters.
addParameters({
  /**
   * Set available backgrounds.
   * Plug-in: @storybook/addon-backgrounds
   */
  backgrounds: [
    { name: 'transparent', value: 'transparent' },
    { name: 'white', value: '#fff' },
    { name: 'grey', value: 'grey' },
    { name: 'black', value: '#000' },
  ],

  /**
   * Set default options.
   * ref: https://github.com/storybookjs/storybook/blob/master/docs/src/pages/configurations/options-parameter/index.md
   */
  options: {
    enableShortcuts: false,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: undefined,
    sidebarAnimations: true,
  },

  /**
   * Set available viewports.
   * Plug-in: @storybook/addon-viewport
   */
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

// Add default decorators.
addDecorator(withA11y);
addDecorator(withInfo);
addDecorator(withKnobs);

configure(req, module);
