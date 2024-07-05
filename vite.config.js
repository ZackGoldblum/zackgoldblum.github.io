import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    hmr: true
  },
  plugins: [
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.includes('.')) {
            next();
          } else {
            req.url = '/index.html';
            next();
          }
        });
      },
    },
  ],
});
