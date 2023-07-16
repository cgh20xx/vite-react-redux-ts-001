import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 讓 index.html 裡的 src="/assets/xxx"改為相對路徑 src="./assets/xxx"
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
    }
  },
})
