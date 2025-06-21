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
  // Global ignores (must be in the first configuration object)
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

  // Unified configuration for TypeScript/React files
  {
    extends: [
      // Basic ESLint recommended configuration
      // https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
      js.configs.recommended,

      // TypeScript ESLint recommended configuration
      // https://typescript-eslint.io/getting-started/#step-2-configuration
      tseslint.configs.recommended,

      // 4-7x faster composable ESLint rules for libraries and frameworks that use React as a UI runtime
      // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x
      react.configs.recommended,

      // React Hooks recommended configuration (flat config support in v5.2.0+)
      // https://www.npmjs.com/package/eslint-plugin-react-hooks
      reactHooks.configs['recommended-latest'],

      // React Refresh configuration
      // https://github.com/ArnaudBarre/eslint-plugin-react-refresh#usage
      reactRefresh.configs.vite,

      // JSX accessibility recommended configuration
      // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#shareable-configs
      jsxA11y.flatConfigs.recommended,

      // Import plugin recommended configuration with TypeScript support
      // https://github.com/import-js/eslint-plugin-import#config---flat-eslintconfigjs
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,

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
        version: 'detect',
      },

      // Import plugin settings for absolute path resolution
      // https://github.com/import-js/eslint-plugin-import#settings
      'import/resolver': {
        // TypeScript resolver for absolute imports
        // https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
        // Node resolver as fallback
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },

    rules: {
      // ===== Import Management Rules =====

      // Ensure imports point to a file/module that can be resolved
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
      'import/no-unresolved': [
        'error',
        {
          ignore: [
            '^/.*', // Ignore absolute paths starting with / (public directory files)
          ],
        },
      ],

      // Ensure named imports correspond to a named export in the remote file
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md
      'import/named': 'error',

      // Ensure a default export is present, given a default import
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/default.md
      'import/default': 'error',

      // Enforce a convention in module import order
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // npm packages
            'internal', // Internal modules (with absolute paths)
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

      // Ensure all imports appear before other statements
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
      'import/first': 'error',

      // Enforce a newline after import statements
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
      'import/newline-after-import': 'error',

      // Forbid repeated import of the same module in multiple places
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
      'import/no-duplicates': 'error',

      // Forbid unnecessary path segments in import and require statements
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

      // Forbid importing packages through relative paths
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-packages.md
      'import/no-relative-packages': 'error',

      // Enforce consistent import paths
      // Allow relative imports within the same feature, require absolute for cross-feature
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message: 'Use absolute imports (e.g., @/components) for imports that go up more than one level.',
            },
            {
              group: ['../../../*'],
              message: 'Use absolute imports (e.g., @/components) instead of deeply nested relative imports.',
            },
          ],
        },
      ],

      // Forbid a module from importing a module with a dependency path back to itself
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
      'import/no-cycle': ['error', { maxDepth: 10 }],

      // Forbid a module from importing itself
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md
      'import/no-self-import': 'error',

      // Forbid the use of extraneous packages
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{ts,tsx,js,jsx}',
            '**/*.spec.{ts,tsx,js,jsx}',
            '**/test/**/*',
            '**/tests/**/*',
            '**/__tests__/**/*',
            '**/vite.config.ts',
            '**/vitest.config.ts',
            '**/jest.config.js',
            '**/webpack.config.js',
            '**/rollup.config.js',
            '**/.eslintrc.js',
            '**/eslint.config.js',
          ],
        },
      ],

      // ===== TypeScript Enum Rules =====

      // Disallow TypeScript enums (prefer union types or const assertions)
      // https://typescript-eslint.io/blog/announcing-typescript-eslint-v8-beta/#updated-enum-rules
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message:
            'Enums are not recommended. Use union types (type Status = "pending" | "completed") or const assertions (const Status = { PENDING: "pending", COMPLETED: "completed" } as const) instead.',
        },
      ],

      // Disallow comparing an enum value with a non-enum value
      // https://typescript-eslint.io/rules/no-unsafe-enum-comparison
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',

      // Disallow enums having both string and number members
      // https://typescript-eslint.io/rules/no-mixed-enums
      '@typescript-eslint/no-mixed-enums': 'error',

      // Require that all enum members be literal values
      // https://typescript-eslint.io/rules/prefer-literal-enum-member
      '@typescript-eslint/prefer-literal-enum-member': 'error',

      // ===== Type Definition Rules =====

      // Enforce using interface over type for object type definitions
      // https://typescript-eslint.io/rules/consistent-type-definitions
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // Enforce consistent usage of type imports
      // https://typescript-eslint.io/rules/consistent-type-imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // ===== React Performance Optimization Rules =====

      // Prevent usage of Array index as key
      // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x
      'react-x/no-array-index-key': 'warn',

      // Prevent creating unstable components inside components
      // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x
      'react-x/no-nested-components': 'error',

      // Disallow unnecessary JSX fragments
      // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x
      'react-x/no-useless-fragment': 'error',

      // Verify the list of dependencies for Hooks like useEffect and similar
      // https://github.com/facebook/react/issues/14920
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useMyCustomHook|useMyOtherCustomHook)',
        },
      ],

      // ===== Bundle Size Optimization Rules =====

      // Disallow unnecessary computed property keys in objects and classes
      // https://eslint.org/docs/latest/rules/no-useless-computed-key
      'no-useless-computed-key': 'error',

      // Disallow unnecessary constructors
      // https://eslint.org/docs/latest/rules/no-useless-constructor
      'no-useless-constructor': 'error',

      // Disallow renaming import, export, and destructured assignments to the same name
      // https://eslint.org/docs/latest/rules/no-useless-rename
      'no-useless-rename': 'error',

      // Disallow redundant return statements
      // https://eslint.org/docs/latest/rules/no-useless-return
      'no-useless-return': 'error',

      // Disallow unused variables (handled by TypeScript)
      // https://typescript-eslint.io/rules/no-unused-vars
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

      // ===== Type Safety and Performance Rules =====

      // Enforce using the nullish coalescing operator instead of logical assignments
      // https://typescript-eslint.io/rules/prefer-nullish-coalescing
      '@typescript-eslint/prefer-nullish-coalescing': 'error',

      // Enforce using the optional chaining operator instead of chaining logical ands
      // https://typescript-eslint.io/rules/prefer-optional-chain
      '@typescript-eslint/prefer-optional-chain': 'error',

      // Disallow type assertions that do not change the type of an expression
      // https://typescript-eslint.io/rules/no-unnecessary-type-assertion
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // ===== Existing Project Custom Rules =====

      // Disallow usage of the any type
      // https://typescript-eslint.io/rules/no-explicit-any
      '@typescript-eslint/no-explicit-any': 'warn',

      // Recommend functional components over class components
      // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x
      'react-x/no-class-component': 'warn',

      // ===== Additional Code Quality Rules =====

      // Enforce consistent returning of awaited values
      // https://typescript-eslint.io/rules/return-await
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],

      // Disallow unnecessary equality comparisons against boolean literals
      // https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',

      // ===== Code Complexity Rules =====

      // Enforce a maximum depth that blocks can be nested
      // https://eslint.org/docs/latest/rules/max-depth
      'max-depth': ['error', 3],

      // Enforce a maximum cyclomatic complexity
      // https://eslint.org/docs/latest/rules/complexity
      complexity: ['warn', 10],

      // ===== Additional TypeScript Performance Rules =====

      // Disallow unnecessary conditions
      // https://typescript-eslint.io/rules/no-unnecessary-condition
      '@typescript-eslint/no-unnecessary-condition': 'error',

      // Enforce Promise-like statements to be handled appropriately
      // https://typescript-eslint.io/rules/no-floating-promises
      '@typescript-eslint/no-floating-promises': 'error',

      // Disallow Promises in places not designed to handle them
      // https://typescript-eslint.io/rules/no-misused-promises
      '@typescript-eslint/no-misused-promises': 'error',
    },
  },
);
