module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['import'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-var': 'error',
    'prefer-const': 'error',
    eqeqeq: ['error', 'always'],
    camelcase: 'error',
    'vue/multi-word-component-names': 0,
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['parent', 'sibling', 'index']
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
