import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      'dist',
      'node_modules',
      'build',
      '.vite',
      'coverage',
      '*.min.js',
      '*.d.ts',
      '.history',
    ],
  },

  // Main configuration for TypeScript/React files
  {
    extends: [
      // ESLint recommended rules
      js.configs.recommended,

      // TypeScript ESLint recommended rules (focused on correctness, not style)
      tseslint.configs.recommended,

      // React plugin recommended rules (using react-x for performance)
      react.configs.recommended,

      // React Hooks rules (critical for correctness)
      reactHooks.configs['recommended-latest'],

      // React Refresh for Vite
      reactRefresh.configs.vite,

      // Accessibility rules
      jsxA11y.flatConfigs.recommended,

      // Import plugin for import ordering
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,

      // Prettier (must be last)
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
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      // ===== TypeScript Rules =====

      // Disallow any type (as requested)
      '@typescript-eslint/no-explicit-any': 'error',

      // Prefer interface over type for object definitions
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // Consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // Prefer nullish coalescing and optional chaining (TypeScript team recommendations)
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',

      // ===== Enum Rules =====

      // Discourage enums in favor of union types (performance consideration)
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message:
            'Prefer union types or const assertions over enums for better performance and tree-shaking.',
        },
      ],

      // ===== React Rules =====

      // Prevent using array index as key (as requested)
      'react-x/no-array-index-key': 'error',

      // Prevent creating unstable components inside components
      'react-x/no-nested-components': 'error',

      // ===== Code Quality Rules =====

      // Handle unused variables (TypeScript aware)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      // Ensure promises are handled properly
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Type safety
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // ===== Import Order Rules =====

      // Enforce a consistent import order
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // npm packages
            'internal', // Internal modules (absolute imports)
            'parent', // Parent directory imports
            'sibling', // Same directory imports
            'index', // Index files
            'type', // TypeScript type imports
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],

      // Ensure imports are at the top
      'import/first': 'error',

      // Ensure newline after imports
      'import/newline-after-import': 'error',

      // No duplicate imports
      'import/no-duplicates': 'error',

      // ===== Additional Recommended Rules =====

      // Prevent importing the submodules of other modules
      'import/no-internal-modules': 'off', // Consider enabling for public APIs

      // Ensure imports point to a file/module that can be resolved
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^/.*'], // Ignore absolute paths starting with /
        },
      ],

      // Prevent unnecessary path segments in import statements
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

      // Warn about potential circular dependencies
      'import/no-cycle': ['warn', { maxDepth: 5 }],

      // Suggest absolute imports for deeply nested paths (not strictly enforced)
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../../../*'],
              message:
                'Avoid deeply nested relative imports. Consider using absolute imports for better readability.',
            },
          ],
        },
      ],

      // React-specific additions
      'react-x/no-useless-fragment': 'warn', // <></> when not needed
      'react-x/no-missing-key': 'error', // Ensure key prop in lists
      'react-x/no-unused-class-component-members': 'warn', // Remove unused class members
      'react-x/no-unused-state': 'warn', // Remove unused state
      'react-x/prefer-destructuring-assignment': 'warn', // Prefer destructuring

      // TypeScript strict null checks helpers
      '@typescript-eslint/no-unnecessary-condition': 'warn', // Catches always-true/false conditions

      // Async/await best practices
      '@typescript-eslint/return-await': ['error', 'in-try-catch'], // Proper error stack traces

      // Enforce naming conventions (optional, but helpful)
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false, // Don't use IPrefix
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
      ],

      // ===== Code Quality and Debugging Rules =====

      // Prevent console.log in production code
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Prevent debugger statements
      'no-debugger': 'error',

      // Track TODO and FIXME comments
      'no-warning-comments': ['warn', { terms: ['TODO', 'FIXME'], location: 'start' }],

      // Limit cyclomatic complexity
      complexity: ['warn', 20],
    },
  },
);
