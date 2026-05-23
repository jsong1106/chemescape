import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standard Vite + React config. Base is "/" because Vercel serves at root.
export default defineConfig({
  plugins: [react()],
})
