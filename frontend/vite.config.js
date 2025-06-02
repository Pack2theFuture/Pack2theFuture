import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
    server: {
    port: 10000, // 원하는 포트 번호로 설정
  },
  appType: 'spa',
  base: '/',
});
