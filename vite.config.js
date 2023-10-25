import { defineConfig } from 'vite';
import ViteExpress from 'vite-express';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'app.js',
    }
  },
  optimizeDeps: {
    allowNodeBuiltins: ['http'],
  },
  plugins: [ViteExpress()],
  server: {
    open: true,
  },
});
