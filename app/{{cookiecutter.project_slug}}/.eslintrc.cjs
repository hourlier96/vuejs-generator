/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended', // https://eslint.vuejs.org/user-guide/
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1
        }
      }
    ],
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'beside'
      }
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1
      }
    ]
  }
}
