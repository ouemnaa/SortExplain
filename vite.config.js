import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Temporarily remove base path to test asset loading
  // base: '/SortExplain/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'static/[name].[hash].[ext]',
        chunkFileNames: 'static/[name].[hash].js',
        entryFileNames: 'static/[name].[hash].js',
      },
    },
  },
})
