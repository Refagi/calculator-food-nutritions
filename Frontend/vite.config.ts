import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPath from 'vite-tsconfig-paths'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPath()],
  server: {
    port: 5000,
    proxy: {
      '/v1': 'http://localhost:3000'
    }
  },
})
