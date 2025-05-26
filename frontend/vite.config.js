// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from 'tailwindcss'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Vite 기본값이지만 명시해줘도 좋아요
  },
  server: {
    port: 3000, // 로컬 개발용 포트 (Render와 무관)
  },
  base: '/', // 경로 기준 설정 (Render는 기본 / 로 하면 돼요)
})
