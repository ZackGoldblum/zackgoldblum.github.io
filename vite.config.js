import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    assetsDir: 'assets',
    emptyOutDir: true,
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
      configurePreviewServer(server) {
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
    {
      name: 'copy-html-files',
      writeBundle() {
        const htmlFiles = ['home.html', 'projects.html', 'research.html', 'bookshelf.html', 'about.html', 'space.html'];
        htmlFiles.forEach(file => {
          fs.copyFileSync(resolve(__dirname, file), resolve(__dirname, 'dist', file));
        });
      }
    }
  ],
});
