import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transformJsxInJs = () => ({
  name: 'transform-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.match(/src\/.*\.js$/)) return null;
    return await transformWithOxc(code, id, {
      lang: 'jsx',
      jsx: { runtime: 'automatic' },
    });
  },
});

export default defineConfig({
  plugins: [transformJsxInJs(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js', 'lib/**/*.js'],
    },
  },
});
