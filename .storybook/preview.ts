import { addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import theme from './theme';
// import results from '../.jest-test-results.json';

export const parameters = {
  backgrounds: {
    default: 'transparent',
    values: [
      { name: 'transparent', value: 'transparent' },
      { name: 'white', value: 'white' },
      { name: 'black', value: 'black' },
    ],
  },

  docs: {
    theme,
  },
};

// Results will display for stories that you have set the jest parameter.
// ref: https://github.com/storybookjs/storybook/tree/master/addons/jest#usage
// addDecorator(withTests({ results }));
