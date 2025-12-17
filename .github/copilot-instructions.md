# Copilot Instructions for Julklappslek

## Project Overview

**Julklappslek** is a React 19 + TypeScript + Vite starter project with the React Compiler enabled. It's a minimal template focused on fast development with HMR (Hot Module Replacement) and strict TypeScript checking.

- **Package Manager**: Yarn 1.22.22
- **Build Tool**: Vite 7.x (with React plugin and React Compiler)
- **Linting**: ESLint 9.x with TypeScript support and React Hooks rules
- **Target**: ES2022, browser environment

## Architecture

### Component Structure
- Entry point: [src/main.tsx](src/main.tsx) - renders `<App>` into the root element
- Root component: [src/App.tsx](src/App.tsx) - example counter component using `useState`
- Styling: Component-scoped CSS files (e.g., [src/App.css](src/App.css)) alongside TSX components

### Build Configuration
- **Vite Config**: [vite.config.ts](vite.config.ts) enables `@vitejs/plugin-react` with React Compiler via Babel plugin
- **TypeScript**: Split configs - [tsconfig.app.json](tsconfig.app.json) for source, [tsconfig.node.json](tsconfig.node.json) for build tools
- **Strict Mode**: All files in `src/` use strict TypeScript checking with `noUnusedLocals`, `noUnusedParameters`, and ESNext module resolution

## Development Workflow

### Commands
- **`yarn run dev`** - Start Vite dev server with HMR (typically on `http://localhost:5173`)
- **`yarn run build`** - Type-check with `tsc -b`, then build optimized bundle to `dist/`
- **`yarn run lint`** - Run ESLint across all files
- **`yarn run preview`** - Preview production build locally

### Key Workflow Notes
- HMR works automatically when editing `.tsx` or `.css` files - React Refresh handles component updates
- Type checking happens during build; configure IDE to show errors in real-time
- React Compiler is enabled (impacts dev/build performance but optimizes runtime)

## Code Patterns & Conventions

### React Component Guidelines
- Use functional components with hooks (e.g., `useState`) - no class components
- Import React from 'react' explicitly for hook usage
- JSX syntax: Use `react-jsx` transform (configured in tsconfig.app.json) - no need to import React in components
- Example: See [src/App.tsx](src/App.tsx) for counter pattern with `useState`

### TypeScript Standards
- **Strict Mode Enforced**: `strict: true` in tsconfig.app.json
  - No implicit `any`, strict null checks
  - Unused variables/parameters cause build failures - remove them or mark with `_` prefix
- Use `const` for bindings, avoid `var`
- Explicitly type function parameters and return types

### CSS Imports
- Import CSS files as modules in TSX: `import './App.css'`
- CSS classes apply to elements within that component

### Asset Handling
- Place assets in `src/assets/` and import them: `import logo from './assets/react.svg'`
- Vite handles asset optimization during build

## Linting & Code Quality

### ESLint Rules
- **Base configs**: JS recommended, TypeScript ESLint recommended, React Hooks (enforces rules of hooks)
- **React-specific**: ESLint React Refresh plugin (enforces fast refresh compatibility)
- **No Type-Aware Rules**: Current config uses basic TypeScript rules; stricter type-aware rules can be added if needed

### Pre-commit/Build Checks
- `yarn run build` includes `tsc -b` type-checking before Vite build
- Both must pass for production builds

## Dependencies & Integration Points

### Core Dependencies
- **react@19.2.0**, **react-dom@19.2.0** - Latest React with compiler support
- **babel-plugin-react-compiler** - Optimizes React component performance

### Dev-Only
- **typescript@~5.9.3** - Strict typing
- **vite@7.2.4** - Build & dev server
- **@vitejs/plugin-react@5.1.1** - Vite React integration
- **typescript-eslint@8.x** - TS-aware linting

## Important Gotchas & Decisions

1. **React Compiler Impact**: Enabled globally; can impact dev/build performance. Consider disabling if iterating quickly.
2. **Unused Variables**: Strict TypeScript prevents unused variables/parameters - must explicitly remove or prefix with `_`
3. **Module Resolution**: Uses `bundler` mode - relative imports work as expected, no path aliases configured yet
4. **No Tests**: No testing framework is configured; tests would need to be added separately (Vitest recommended for Vite projects)
5. **React 19**: Using latest version with new hooks and server components support - ensure familiarity with [React 19 changes](https://react.dev)

## File Organization

```
src/
  ├── App.tsx          # Root component
  ├── App.css          # App styling
  ├── main.tsx         # Entry point
  ├── index.css        # Global styles
  └── assets/          # Images, fonts, etc.
public/               # Static files (copied as-is to dist/)
.github/              # GitHub metadata
eslint.config.js      # ESLint configuration
vite.config.ts        # Vite build configuration
tsconfig*.json        # TypeScript configurations
```
