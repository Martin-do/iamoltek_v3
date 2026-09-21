import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import optimiseImages from './scripts/vite-optimise-images.mjs'

export default defineConfig({
  plugins: [react(), optimiseImages()],
})
