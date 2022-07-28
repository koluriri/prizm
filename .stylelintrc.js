module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  ignoreFiles: ['**/node_modules/**', '**/stories/**'],
  rules: {
    'string-quotes': 'single',
  },
};
