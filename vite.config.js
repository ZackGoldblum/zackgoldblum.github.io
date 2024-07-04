import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        projects: resolve(__dirname, 'projects.html'),
        research: resolve(__dirname, 'research.html'),
        bookshelf: resolve(__dirname, 'bookshelf.html'),
        about: resolve(__dirname, 'about.html'),
        space: resolve(__dirname, 'space.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    hmr: true,
    historyApiFallback: {
      index: '/index.html' // Explicitly specify the index file
    }
  }
});
