import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const objGlobal =
  process.env.NODE_ENV === 'development'
    ? {
        define: {
          global: {},
        },
      }
    : {};

// https://vitejs.dev/config/
export default defineConfig({
  ...objGlobal,
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  plugins: [react()],
});
