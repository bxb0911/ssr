module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['@upc/base'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['@upc/base/typescript']
    },
    {
      files: ['global.d.ts', '**/*.vue'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ],
  ignorePatterns: ['**/utils/crypto-js.js']
};
