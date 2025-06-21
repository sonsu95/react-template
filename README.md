# React + TypeScript + Vite Template

A modern React development template with TypeScript, Vite, and comprehensive code quality tools.

## 🚀 Features

- **React 19** with TypeScript 5.8
- **Vite 6** for lightning-fast development
- **ESLint 9** with flat config and TypeScript support
- **Prettier** for consistent code formatting
- **Absolute imports** configured with `@/` alias
- **Pre-configured linting rules** for React best practices
- **SWC** for Fast Refresh
- **S3-based asset management** - All static assets (images, fonts, etc.) are served from S3

## 📦 Included Tools

### Development

- `@vitejs/plugin-react-swc` - React plugin using SWC for Fast Refresh
- TypeScript 5.8.3 with strict mode enabled
- Absolute imports support (`@/` → `src/`)

### Code Quality

- **ESLint 9** with:
  - TypeScript ESLint for type-aware linting
  - React X plugin (4-7x faster than traditional React plugin)
  - React Hooks rules
  - Import ordering and management
  - JSX accessibility rules
  - Prettier integration
- **Prettier 3.5.3** for consistent code formatting

### Dependencies

**Production:**

- React 19.1.0
- React DOM 19.1.0

**Key Development Dependencies:**

- Vite 6.3.5
- TypeScript 5.8.3
- ESLint 9.29.0
- eslint-plugin-react-x 1.52.2
- typescript-eslint 8.34.1

## 🛠️ Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting

# Combined checks
pnpm check        # Run lint and format:check
pnpm check:fix    # Run lint:fix and format
```

## 📝 Code Style Guidelines

### Import Rules

The project enforces consistent import patterns:

```typescript
// ✅ Good - Allowed patterns
import Component from './Component'; // Same directory
import utils from '../utils'; // One level up
import { Button } from '@/components'; // Absolute imports

// ❌ Bad - Will trigger ESLint errors
import Header from '../../components/Header'; // Two+ levels up
import api from '../../../services/api'; // Deep nesting
```

### TypeScript Rules

- **No TypeScript enums** - Use union types or const assertions instead
- **Prefer interfaces** over type aliases for object types
- **Type imports** are automatically enforced
- **No `any` type** - Warnings for explicit any usage

### React Best Practices

- Functional components only (class components discouraged)
- No array index as key in lists
- No nested component definitions
- Proper dependency arrays for hooks
- No unnecessary fragments

### Performance Rules

- Code complexity limits (max depth: 3, cyclomatic complexity: 10)
- Proper Promise handling enforced
- Unnecessary type assertions prevented
- Nullish coalescing and optional chaining preferred

## 🏗️ Project Structure

```text
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Root component
│   ├── App.css          # App styles
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── scripts/             # Build and utility scripts
├── index.html           # HTML entry point
├── eslint.config.js     # ESLint configuration
├── prettier.config.js   # Prettier configuration
├── tsconfig.json        # TypeScript base config
├── tsconfig.app.json    # App TypeScript config
├── tsconfig.node.json   # Node TypeScript config
└── vite.config.ts       # Vite configuration
```

**Note:** All static assets (images, fonts, icons, favicons, etc.) are hosted on S3 and referenced via CDN URLs. This project has no public folder - even the favicon is served from S3.

## 🖼️ Asset Management

This project uses S3 for all static asset management:

```typescript
// Example: Using S3-hosted assets
const logo = 'https://your-s3-bucket.s3.region.amazonaws.com/images/logo.svg';
const favicon = 'https://your-s3-bucket.s3.region.amazonaws.com/favicon.ico';
const userAvatar = `${S3_BASE_URL}/avatars/${userId}.png`;

// In components
<img src={logo} alt="Company Logo" />

// In index.html (for favicon)
<link rel="icon" href="https://your-s3-bucket.s3.region.amazonaws.com/favicon.ico" />
```

Benefits:

- Reduced bundle size
- CDN distribution for better performance
- Centralized asset management
- Version control focuses on code only

## 🔧 Configuration

### TypeScript Path Aliases

Configured in `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### ESLint Configuration

The project uses ESLint 9's flat config system with:

- TypeScript ESLint for type checking
- React X plugin for fast React linting (4-7x faster)
- Import plugin for import management
- JSX accessibility checks
- Comprehensive rule set for code quality

### Prettier Configuration

Configured in `prettier.config.js`:

- 100 character line width
- Single quotes for JS/TS
- Double quotes for JSX
- Trailing commas
- Arrow function parentheses
- LF line endings

### Vite Configuration

Configured in `vite.config.ts`:

- React plugin with SWC
- Path alias resolution
- TypeScript support

## 🚀 Getting Started

1. **Clone and install dependencies:**

   ```bash
   git clone <repository>
   cd react-template
   pnpm install
   ```

2. **Configure environment variables:**

   ```bash
   # Create .env.local file
   cp .env.example .env.local

   # Add your S3 configuration
   VITE_S3_BASE_URL=https://your-s3-bucket.s3.region.amazonaws.com
   ```

3. **Start development:**

   ```bash
   pnpm dev
   ```

4. **Build for production:**

   ```bash
   pnpm build
   ```

## 📚 Learn More

- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [ESLint Documentation](https://eslint.org)
- [React X ESLint Plugin](https://github.com/Rel1cx/eslint-react)
