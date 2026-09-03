import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  // Pin PostCSS config to this project so Vite does not walk up to a
  // stray config on a parent/drive-root directory.
  css: {
    postcss: {},
  },
});
