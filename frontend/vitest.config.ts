/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',     // Indique à Vitest d'utiliser jsdom pour simuler le DOM
    globals: true,            // Permet d'utiliser des fonctions globales comme 'describe', 'it', etc.
    setupFiles: ['./src/setupTests.ts'], // (optionnel) si vous créez un fichier de config
  },
})
