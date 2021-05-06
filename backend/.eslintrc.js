module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.ts',
        ],
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
      },
    ],
  },
};
