import { create } from '@storybook/theming/create';

/**
 * Customized storybook theme.
 * - ref: https://storybook.js.org/docs/react/configure/theming#create-a-theme-quickstart
 */
export default create({
  base: 'light',

  colorPrimary: '#5e56f0',
  colorSecondary: '#7700ff',

  // UI
  appBg: '#fff',
  appBorderColor: 'rgba(0, 0, 0, 0.15)',
  appBorderRadius: 4,

  // Typography
  fontBase:
    '"Inter", "NotoSansKR", "NotoSansJP", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", "Roboto", system-ui, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#242428',
  textInverseColor: 'rgba(255, 255, 255, 0.9)',

  // Toolbar default and active colors
  barTextColor: 'rgba(36, 36, 40, 0.6)',
  barSelectedColor: '#5e56f0',
  barBg: '#fff',

  // Form colors
  inputBg: '#fff',
  inputBorder: '#7700ff',
  inputTextColor: '#242428',
  inputBorderRadius: 4,

  brandTitle: 'react-channel-plugin storybook',
  brandUrl: 'https://channel.io/',
  brandImage: 'https://channel.io/images2/common/ch-logo-en.png',
});
