/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: '.',
  mount: {
    './playground/public': { url: '/', static: true },
    './playground': { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es5',
  },
  devOptions: {
    open: 'none',
  },
};
