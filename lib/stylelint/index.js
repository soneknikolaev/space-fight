module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  ignoreFiles: ['.gitignore', '.huskyrc.json', '.npmignore', '.prettierignore', '*.json', 'README.md'],
  rules: {
    'at-rule-no-unknown': null,
    'at-rule-empty-line-before': null,
    'at-rule-no-vendor-prefix': true,
    'color-hex-case': 'lower',
    'color-named': 'never',
    'comment-whitespace-inside': 'always',
    'declaration-block-no-shorthand-property-overrides': null,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'font-weight-notation': 'numeric',
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'no-descending-specificity': null,
    'no-duplicate-selectors': true,
    'property-no-vendor-prefix': true,
    'rule-empty-line-before': null,
    'scss/at-rule-no-unknown': true,
    'selector-attribute-quotes': 'always',
    'selector-combinator-space-after': 'always',
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'import', 'local'],
      },
    ],
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-colon-notation': 'single',
    'string-quotes': 'single',
    'value-no-vendor-prefix': true,
  },
};
