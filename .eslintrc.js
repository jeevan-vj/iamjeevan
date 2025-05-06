module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'react/no-unescaped-entities': 0,
    // Disable additional ESLint rules
    'jsx-a11y/accessible-emoji': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'react/display-name': 'off',
    'react/jsx-no-target-blank': 0,
    // You can add more rules to disable as needed
  },
}
