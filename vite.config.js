import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to https://<user>.github.io/<repo>/ set base to '/<repo>/'
// If deploying to https://<user>.github.io/ (user site), keep base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})