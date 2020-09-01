module.exports = {
  rules: {
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-indent-props': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': ['off', {}],
    'react/sort-comp': [
      2,
      {
        order: ['static-variables', 'static-methods', 'instance-variables', 'lifecycle', 'render', 'everything-else'],
      },
    ],
    'react/static-property-placement': ['error', 'static public field'],
  },
};
