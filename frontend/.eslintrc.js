module.exports = {
  extends: ['../.eslintrc', 'plugin:react/recommended'],
  parserOptions: {
    project: 'tsconfig.json',
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'eslint:recommended/no-extra-boolean-cast': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
};
