import { fileURLToPath, URL } from 'node:url'
import dns from 'dns'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
