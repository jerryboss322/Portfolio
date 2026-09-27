/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    /* The suite mounts the entire page — 3D text extrusions, the WebGL canvas
       and every section — in jsdom, where forced style recalcs are ~100x slower
       than a browser. Several tests already sat near the 5s default and started
       failing as soon as the page grew, which says nothing about the product. */
    testTimeout: 20000,
  },
  build: {
    sourcemap: false,
    target: 'es2022',
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: /node_modules\/(react|react-dom|react-router-dom|react-router)/ },
            { name: 'vendor-motion', test: /node_modules\/framer-motion/ },
          ],
        },
      },
    },
  },
  server: {
    open: true,
    port: 5173,
  },
});
