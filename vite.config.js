import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig((mode) => {
  const base = mode === 'production' ? '/' : '/'
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
    },
    server: {
      port: 5173,
      open: true,
    },
  }
})