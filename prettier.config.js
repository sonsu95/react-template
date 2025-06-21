/** @type {import("prettier").Config} */
const config = {
  // Basic formatting
  printWidth: 100, // Maximum line length
  tabWidth: 2, // Tab width
  useTabs: false, // Use spaces instead of tabs
  semi: true, // Use semicolons
  singleQuote: true, // Use single quotes
  quoteProps: 'as-needed', // Quote object properties only when needed

  // JSX settings
  jsxSingleQuote: false, // Use double quotes in JSX
  bracketSpacing: true, // Add spaces between brackets in object literals

  // Arrow function settings
  arrowParens: 'always', // Always use parentheses around arrow function parameters

  // Other settings
  trailingComma: 'all', // Add trailing commas wherever possible
  endOfLine: 'lf', // Line ending character (LF)
  embeddedLanguageFormatting: 'auto', // Auto-format embedded languages
  singleAttributePerLine: false, // Allow multiple JSX attributes per line

  // File-specific settings
  overrides: [
    {
      files: '*.json',
      options: {
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2,
      },
    },
  ],

  // Plugins
  plugins: [],
};

export default config;
