# AGENTS.md - Development Guidelines

This is a React + Three.js 3D portfolio website project.

---

## 1. Build & Development Commands

### Installation
```bash
npm install
```

### Development
```bash
npm run dev          # Start dev server with hot reload
```

### Build
```bash
npm run build        # Production build
npm run preview      # Preview production build locally
```

### Linting & Type Checking
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix lint errors automatically
npm run typecheck    # Run TypeScript type checking
```

### Testing (if Jest/Vitest is configured)
```bash
npm run test              # Run all tests
npm run test -- --run     # Run tests once (no watch mode)
npm run test -- --run src/components/Button.test.jsx  # Run single test file
npm run test -- --run -t "Button renders"             # Run single test by name
npm run test -- --coverage  # Run with coverage report
```

---

## 2. Code Style Guidelines

### General Principles
- Write clean, readable, and maintainable code
- Keep functions small and focused (single responsibility)
- Use meaningful variable and function names
- Avoid magic numbers - use constants instead

### TypeScript Usage
- Always define prop types for React components
- Use TypeScript interfaces for data structures
- Prefer `interface` over `type` for object shapes
- Use `unknown` instead of `any` - never use `any`

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// Avoid
const Button = (props: any) => { ... }
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `Header.tsx`, `ThreeScene.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts`, `useThreeLoader.ts` |
| Utils | camelCase | `formatDate.ts`, `calculatePosition.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_PARTICLES`, `API_BASE_URL` |
| Types/Interfaces | PascalCase | `UserData`, `ProjectConfig` |
| Files (components) | PascalCase | `ThreeCanvas.tsx` |
| Files (hooks/utils) | camelCase | `useScrollAnimation.ts` |

### Import Order (ESLint rule: order)

```typescript
// 1. React/Framework imports
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

// 2. External libraries
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3. Internal components
import Header from './components/Header';
import ThreeScene from './components/3D/ThreeScene';

// 4. Hooks
import { useScrollPosition } from './hooks/useScrollPosition';

// 5. Utils
import { formatDate } from './utils/dateUtils';

// 6. Types
import type { Project } from './types';

// 7. Assets
import logo from './assets/logo.png';
```

### Component Structure

```typescript
// Component file structure
import React from 'react';
import type { ComponentProps } from './types';

// 1. Type definitions
interface Props {
  title: string;
  onSubmit: (data: Data) => void;
}

// 2. Component definition
export function MyComponent({ title, onSubmit }: Props) {
  // 3. Hooks
  const [state, setState] = useState<string>('');

  // 4. Effects
  useEffect(() => {
    // effect logic
  }, []);

  // 5. Handlers
  const handleClick = () => {
    onSubmit({ title: state });
  };

  // 6. Render
  return (
    <div className="component">
      <h1>{title}</h1>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
```

### Three.js / R3F Specific Guidelines

- Always handle loader states (loading, error, success)
- Dispose of geometries and materials in `useEffect` cleanup
- Use `useFrame` for animations instead of `requestAnimationFrame`
- Enable shadows only when needed for performance
- Use `React.memo` for expensive 3D components
- Implement LOD (Level of Detail) for complex models

```typescript
// Good: Proper resource cleanup
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
  };
}, []);

// Good: Conditional rendering for performance
{shouldRenderHeavyElement && <ExpensiveModel />}
```

### Error Handling

- Always wrap async operations in try-catch
- Provide user-friendly error messages
- Log errors for debugging (use appropriate logging level)

```typescript
// Good
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Failed to fetch data:', error);
  setError('Unable to load data. Please try again.');
}

// Good: Error boundaries for React components
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
}
```

### CSS / Styling

- Use Tailwind CSS for styling (this project uses Tailwind)
- Prefer utility classes over custom CSS
- Use CSS variables for theme colors
- Keep responsive design in mind (mobile-first)

### File Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── 3D/              # Three.js/R3F components
│   └── layouts/         # Layout components
├── hooks/               # Custom React hooks
├── stores/              # State management (Zustand/Context)
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── assets/              # Static assets (images, fonts, models)
├── constants/           # App constants
└── App.tsx
```

---

## 3. Testing Guidelines

### Test File Naming
- Component tests: `ComponentName.test.tsx`
- Hook tests: `useHookName.test.ts`
- Utils tests: `functionName.test.ts`

### Test Structure (AAA Pattern)
```typescript
describe('FunctionName', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

### Testing 3D Components
- Mock Three.js objects when possible
- Test component mounting/unmounting
- Test prop changes and re-renders

---

## 4. Git Conventions

- Use meaningful commit messages
- Commit frequently with atomic changes
- Format: `type(scope): description`

```
feat(header): add sticky navigation
fix(three-scene): resolve memory leak on unmount
perf(model-loader): implement lazy loading
```

---

## 5. Performance Checklist

- [ ] Use `React.memo` for expensive components
- [ ] Implement code splitting with `React.lazy`
- [ ] Optimize 3D model sizes (< 2MB per model)
- [ ] Use texture compression (WebP, KTX2)
- [ ] Implement virtual scrolling for long lists
- [ ] Lazy load below-the-fold content
- [ ] Monitor bundle size with source-map-explorer

---

## 6. Accessibility

- Always include `alt` text for images
- Use semantic HTML elements
- Ensure keyboard navigation works
- Maintain proper color contrast (WCAG AA)
- Use `aria-label` for icon-only buttons

## 7. Important Notice:
- Before writing any code, it is necessary to read the complete memory bank/@ architecture. md (including the complete database structure) in its entirety
- Before writing any code, it is necessary to read memory-bank/@ game-design-document.md in its entirety
- After completing each major function or milestone, the memory bank/@ architecture. md must be updated