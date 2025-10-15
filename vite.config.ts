import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  resolve: {
    alias: {
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@core": path.resolve(__dirname, "src/Core"),
      "@components": path.resolve(__dirname, "src/components"),
      "@UserStore": path.resolve(__dirname, "src/Stores/user.ts"),
      "@RecordHooks": path.resolve(__dirname, "src/Hooks/Record.Hook.ts"),
      "@NotFound": path.resolve(__dirname, "src/common/components/NotFound.vue"),
      "@ComonDto":path.resolve(__dirname, "src/common/dto/pagination.dto.ts"),
      "@ComonResponse":path.resolve(__dirname, "src/common/dto/PaginatedReponse.ts"),
      "@shared":path.resolve(__dirname, "src/feautures/Shared"),
    },
  },
})