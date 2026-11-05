import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@betanggo/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@betanggo/solver': path.resolve(__dirname, '../../packages/solver/src')
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
