import { defineConfig } from 'vite';

import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@store': path.resolve(__dirname, '/src/store'),
      '@actions': path.resolve(__dirname, '/src/store/actions.js'),
      '@modules': path.resolve(__dirname, '/src/modules'),
      '@images': path.resolve(__dirname, '/src/img'),
      '@pages': path.resolve(__dirname, '/src/pages'),
      '@static': path.resolve(__dirname, '/src/static'),
      '@constants': path.resolve(__dirname, '/src/constants'),
      '@selectors': path.resolve(__dirname, '/src/store/selectors.js'),
      '@hooks': path.resolve(__dirname, '/src/hooks.js'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
      },
    },
  },
  plugins: [react()],
});
