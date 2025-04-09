module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        // Relaxed rules to start with
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        'react/display-name': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
}; 