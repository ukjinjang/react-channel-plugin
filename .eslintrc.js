module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:cypress/recommended',
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
    'cypress/globals': true,
  },
  rules: {
    // === plugin:@typescript-eslint/recommended ===
    // === ref: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin ===
    '@typescript-eslint/adjacent-overload-signatures': 'warn',
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/unbound-method': 'off',

    // === plugin:cypress/recommended ===
    'cypress/no-unnecessary-waiting': 'off',

    // === eslint ===
    camelcase: 'off',
    'comma-dangle': 'off',
    'no-console': 'warn',
    'no-multiple-empty-lines': 'off',
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
