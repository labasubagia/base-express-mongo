module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'plugin:jest/all'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  rules: {
    'no-console': 'off',
    'prettier/prettier': 'off',
    'jest/no-hooks': 'off',
    'import/extensions': ['off', { extensions: ['.ts', '.tsx'] }],
    'import/no-unresolved': ['off', { extensions: ['.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': ['off'],
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
