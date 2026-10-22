import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/.wrangler',
      '**/.expo',
      '**/android',
      '**/expo-env.d.ts',
      'roadmap.html',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  prettier,
  {
    rules: {
      'max-lines-per-function': ['warn', { max: 30, skipBlankLines: true }],
      'max-params': ['warn', 3],
      'no-warning-comments': 'error',
    },
  },
  {
    files: ['apps/mobile/**/*.{ts,tsx}'],
    ...reactHooks.configs.flat['recommended-latest'],
  },
  {
    files: ['apps/mobile/**/*.tsx'],
    rules: {
      'max-lines-per-function': ['warn', { max: 60, skipBlankLines: true }],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'max-lines-per-function': 'off',
    },
  },
);
