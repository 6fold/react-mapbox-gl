module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  plugins: ['@sixfold'],
  extends: [
    'plugin:@sixfold/base',
    'plugin:@sixfold/react',
    'plugin:@sixfold/jest'
  ],
  rules: {
    // rules turned off during the migration, can be fixed and enabled later
    'import/no-named-as-default': 'off',
    'react/no-children-prop': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jest/expect-expect': 'off',
    'jest/no-disabled-tests': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'array-callback-return': 'off'
  }
};
