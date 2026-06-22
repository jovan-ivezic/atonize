import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Support for React Router - fallback to index.html for client-side routing
  server: {
    historyApiFallback: true,
  },
})
