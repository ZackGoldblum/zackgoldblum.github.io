import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                projects: 'projects.html',
                research: 'research.html',
                bookshelf: 'bookshelf.html',
                about: 'about.html',
                space: 'space.html',
                '404': '404.html'
            }
        }
    }
});
