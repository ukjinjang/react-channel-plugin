/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: '.',
  mount: {
    './playground/public': { url: '/', static: true },
    './playground': { url: '/_dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    process.env.BABEL_ENV ? '@snowpack/plugin-babel' : null,
    [
      '@snowpack/plugin-webpack',
      {
        sourceMap: false,
        outputPattern: {
          js: 'js/[id].[contenthash].js',
        },
        htmlMinifierOptions: {
          collapseWhitespace: true,
          minifyCSS: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
      },
    ],
    process.env.DEPLOY === 'true'
      ? [
          'snowpack-plugin-replace',
          {
            list: [
              {
                from: '/favicon.png',
                to: '/react-channel-plugin/favicon.png',
              },
            ],
          },
        ]
      : null,
  ].filter(Boolean),
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  alias: {
    'react-channel-plugin': './src',
  },
  packageOptions: {
    knownEntrypoints: [
      'fast-deep-equal',
      'github-buttons',
      'react/jsx-runtime',
    ],
    polyfillNode: true,
  },
  devOptions: {
    open: 'none',
    port: 8090,
  },
  buildOptions: {
    out: 'build',
    baseUrl: process.env.DEPLOY === 'true' ? '/react-channel-plugin' : '/',
  },
};
