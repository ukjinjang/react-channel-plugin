import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import istanbul from 'vite-plugin-istanbul';

import pkgJson from './package.json';

//
//
//

const cwd = process.cwd();

const root = path.join(cwd, 'playground');
const srcRoot = path.join(cwd, 'src');

//
//
//

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, '');
  const isTestEnv = env.CYPRESS_COVERAGE === 'true';

  return {
    root,

    build: {
      outDir: path.join(cwd, 'build'),
      emptyOutDir: true,
      sourcemap: isTestEnv ? 'inline' : 'hidden',
    },

    define: {
      global: {},
    },

    publicDir: path.join(root, 'public'),

    resolve: {
      alias: [
        // allow to import src with package name
        // e.g. 'import { magic } from '@my-org/awesome';
        {
          find: pkgJson.name,
          replacement: `${srcRoot}/index.ts`,
        },

        // allow to import src with absolute path (to handle imports inside of src)
        // e.g. 'import { magic } from 'src/awesome';
        {
          find: /^src(\/.*)?$/,
          replacement: `${srcRoot}/$1`,
        },
      ],
    },

    server: {
      port: Number(env.PORT) || 8090,
    },

    plugins: [
      react({
        babel: {
          plugins: [
            [
              '@emotion',
              {
                sourceMap: true,
                autoLabel: 'always',
                labelFormat: '[local]',
                cssPropOptimization: true,
              },
            ],
          ],
        },
      }),

      istanbul({
        cwd,
        cypress: true,
        forceBuildInstrument: isTestEnv,
        extension: ['.ts', '.tsx'],
        include: ['src/**/*'],
        nycrcPath: path.join(cwd, '.nycrc.json'),
        requireEnv: true,
      }),
    ],
  };
});
