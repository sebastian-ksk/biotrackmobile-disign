import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/biotrackmobile-disign/',
  server: {
    host: true,
    allowedHosts: [
      'web-i4xyg02l5szk.up-de-fra1-k8s-1.apps.run-on-seenode.com',
      'localhost',
      '.github.io',
    ],
  },
})
