module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'jsdoc', 'jsx-a11y'],
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'warn',
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/unbound-method': 'off',

    camelcase: 'off',
    'comma-dangle': 'off',
    'no-console': ['warn', { allow: ['debug', 'warn', 'error'] }],
    'no-multiple-empty-lines': 'off',
    'no-unused-expressions': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
