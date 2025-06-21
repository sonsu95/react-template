import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react-x';

export default tseslint.config(
  // 1. Global ignores (must be in the first configuration object)
  // https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
  {
    ignores: [
      'dist',
      'node_modules',
      'build',
      '.vite',
      'coverage',
      'vite.config.ts.timestamp-*',
      '*.min.js',
      '*.d.ts',
      '.history',
    ],
  },

  // 2. Unified configuration for TypeScript/React files
  {
    extends: [
      // Basic ESLint recommended configuration
      // https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
      js.configs.recommended,

      // TypeScript ESLint recommended configuration
      // https://typescript-eslint.io/getting-started/#step-2-configuration
      tseslint.configs.recommended,

      // use eslint-plugin-react-x
      // 4-7x faster composable ESLint rules for for libraries and frameworks that use React as a UI runtime.
      // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x
      react.configs.recommended,

      // React plugin recommended configuration
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md#flat-configs
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],

      // React Hooks recommended configuration (flat config support in v5.2.0+)
      // https://www.npmjs.com/package/eslint-plugin-react-hooks
      // Note: While Vite templates auto-generate this as plugins, the official package
      // documentation recommends using extends. This approach is also used in the Vite repository.
      reactHooks.configs['recommended-latest'],

      // React Refresh configuration
      // https://github.com/ArnaudBarre/eslint-plugin-react-refresh#usage
      // Note: Similar to react-hooks, this is recommended as extends rather than plugins
      // despite Vite templates generating it differently.
      reactRefresh.configs.vite,

      // JSX accessibility recommended configuration
      // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#shareable-configs
      jsxA11y.flatConfigs.recommended,

      // Prettier configuration (must be last to override conflicting rules)
      // https://github.com/prettier/eslint-config-prettier#installation
      eslintConfigPrettier,
    ],

    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: {
        // Auto-detect React version
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md
        // See "Configuration (legacy eslintrc)" section for settings object details
        version: 'detect',
      },
    },

    rules: {
      // React Hooks rules are already included via recommended-latest config above
      // Custom additional hooks pattern for exhaustive-deps rule
      // https://www.npmjs.com/package/eslint-plugin-react-hooks?activeTab=readme
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useMyCustomHook|useMyOtherCustomHook)',
        },
      ],

      // Project-specific custom rules
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/prop-types': 'off', // Unnecessary when using TypeScript
      'react-x/no-class-component': 'warn',
    },
  },
);
