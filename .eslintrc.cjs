module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false,
    },
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue']
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}
