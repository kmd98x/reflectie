import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: if repo name is not 'username.github.io', use '/repo-name/'
// For local development or custom domain, use '/'
const getBasePath = () => {
  if (process.env.GITHUB_ACTIONS) {
    // If VITE_BASE_PATH is set, use it; otherwise default to '/reflectie/'
    return process.env.VITE_BASE_PATH || '/reflectie/'
  }
  return '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})

