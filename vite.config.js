import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  base: './',
  build: {
    minify: true,
  },
  define: {
    'process.env': { NODE_ENV: 'production' },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  css: {
    devSourcemap: true,
  },
  cssPreprocessOptions: {
    less: {
      javascriptEnabled: true,
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@page': '/src/page',
    },
  },
  plugins: [react()],
});
