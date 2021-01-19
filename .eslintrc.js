module.exports = {
  plugins: [
    'security'
  ],
  extends: [
    'airbnb-base',
    'plugin:security/recommended'
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'comma-dangle': ['error', {
      arrays: 'never'
    }],
    strict: 'off',
    'linebreak-style': ['error', 'windows']
  }
};
