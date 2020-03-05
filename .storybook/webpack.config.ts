///<reference path="../typings/storybook.d.ts"/>
import { Configuration } from 'webpack';
const path = require('path');

// Paths for webpack config.
const SRC_PATH = path.resolve(__dirname, '..', 'src');
const TSCONFIG_PATH = path.resolve(__dirname, 'tsconfig.json');

// Webpack config for storybook.
module.exports = ({ config }: { config: Configuration }) => {
  // Set webpack build mode.
  config.mode =
    process.env.NODE_ENV === 'production' ? 'production' : 'development';

  config.module = {
    ...config.module,
    rules: [
      ...config.module?.rules,

      // Add typescript transfiler.
      {
        test: /\.tsx?$/,
        include: [SRC_PATH],
        use: [
          // Babel preset used by Create React App.
          // ref: https://www.npmjs.com/package/babel-preset-react-app
          {
            loader: 'babel-loader',
          },

          // A webpack loader with cache for react/typescript components for storybook.
          // ref: https://github.com/atanasster/webpack-react-docgen-typescript
          {
            loader: 'webpack-react-docgen-typescript',
            options: { tsconfigPath: TSCONFIG_PATH },
          },
        ],
      },
    ],
  };

  config.resolve = {
    ...config.resolve,

    // Add extensions.
    extensions: [...config.resolve?.extensions, '.ts', '.tsx'],
  };

  config.plugins = [...config.plugins];

  return config;
};
