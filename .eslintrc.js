module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: ['resource'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/base',
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  rules: {
    "nuxt/no-cjs-in-config": "off",
    'no-console': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-prop-type-constructor': 'off',
    'new-cap': 'off',
    'camelcase': 'off',
  },
  globals: {
    '$': true,
    '_': true,
    'axios': true,
    'moment': true,
    'App': true,
  }
}
