module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/typescript'
  ],
  rules: {
    'no-console': 'off',
    'space-before-function-paren': 'off',
    'indent': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
