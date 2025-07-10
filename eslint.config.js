import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// =====================================================
// Common Configurations
// =====================================================

const COMMON_LANGUAGE_OPTIONS = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  globals: {
    ...globals.browser,
    ...globals.node,
  },
};

const COMMON_PRETTIER_PLUGIN = {
  prettier: prettierPlugin,
};

const UNUSED_VARS_PATTERN = {
  argsIgnorePattern: '^_',
  varsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_',
};

const IMPORT_ORDER_CONFIG = {
  groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
  'newlines-between': 'always',
  alphabetize: {
    order: 'asc',
    caseInsensitive: true,
  },
};

// =====================================================
// Rule Configurations
// =====================================================

const BASE_RULES = {
  'prefer-const': 'error',
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'prettier/prettier': 'error',
};

const TYPESCRIPT_RULES = {
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'inline-type-imports',
    },
  ],
  '@typescript-eslint/no-unused-vars': ['error', UNUSED_VARS_PATTERN],
};

const REACT_RULES = {
  'react/jsx-key': ['error', { checkFragmentShorthand: true }],
  'react/react-in-jsx-scope': 'off', // React 17+ automatic JSX runtime
  'react/jsx-uses-react': 'off', // React 17+ automatic JSX runtime
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
};

const IMPORT_RULES = {
  'import/order': ['error', IMPORT_ORDER_CONFIG],
};

const GENERAL_RULES = {
  'no-unused-vars': 'off', // Handled by @typescript-eslint/no-unused-vars
  'no-restricted-syntax': [
    'error',
    {
      selector: 'TSEnumDeclaration',
      message: 'Use const assertions or union types instead of enums.',
    },
  ],
};

// =====================================================
// File-specific Configurations
// =====================================================

const ignoresConfig = {
  ignores: [
    'dist',
    'node_modules',
    'build',
    '.vite',
    'coverage',
    '*.min.js',
    '*.d.ts',
    '.history',
    '**/.git/**',
  ],
};

const javascriptConfig = {
  files: ['**/*.{js,mjs,cjs}'],
  languageOptions: COMMON_LANGUAGE_OPTIONS,
  plugins: COMMON_PRETTIER_PLUGIN,
  rules: {
    ...BASE_RULES,
    'no-unused-vars': ['error', UNUSED_VARS_PATTERN],
  },
};

const typescriptReactConfig = {
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    ...COMMON_LANGUAGE_OPTIONS,
    parserOptions: {
      project: './tsconfig.app.json',
      tsconfigRootDir: __dirname,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    react: {
      version: 'detect',
      runtime: 'automatic',
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
  plugins: COMMON_PRETTIER_PLUGIN,
  rules: {
    ...BASE_RULES,
    ...TYPESCRIPT_RULES,
    ...REACT_RULES,
    ...IMPORT_RULES,
    ...GENERAL_RULES,
  },
};

// =====================================================
// Final Configuration
// =====================================================

const config = [
  ignoresConfig,
  js.configs.recommended,
  ...fixupConfigRules(
    compat.extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
    ),
  ),
  javascriptConfig,
  typescriptReactConfig,
  eslintConfigPrettier,
];

export default config;
