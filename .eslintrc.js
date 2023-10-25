module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": 'off',
    "react/function-component-definition": 'off',
    'no-console': 'off', // Désactive la règle no-console
  },
  overrides: [
    {
      files: ['**/*.test.js'], // Applique cette configuration aux fichiers de test
      rules: {
        'no-console': 'off', // Désactive la règle no-console pour les fichiers de test
      },
    },
  ],
};
