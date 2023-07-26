module.exports = {
  extends: [
    'turbo',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:typescript-sort-keys/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'tailwindcss',
    'typescript-sort-keys',
    'unused-imports',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'error',
    'prettier/prettier': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^ar-grocery-api'],
          ['^~?'],
          ['^\\.\\.(?!/?$imports)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$'],
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'react/jsx-sort-props': [
      'warn',
      {
        shorthandLast: true,
        reservedFirst: true,
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'typescript-sort-keys/interface': ['error', 'asc', { requiredFirst: true }],
    'tailwindcss/classnames-order': ['warn', { config: 'tailwind-config/index.js' }],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'turbo/no-undeclared-env-vars': [
      'warn',
      {
        allowList: ['NEXT_PUBLIC_[A-Z]+'],
      },
    ],
    'unused-imports/no-unused-imports': 'warn',
    'no-unused-vars': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
  },
}
