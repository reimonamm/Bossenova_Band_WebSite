import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
  server: {
    host: '0.0.0.0', // Allows access from other devices
    port: 5173,      // Specify the port
  },
})