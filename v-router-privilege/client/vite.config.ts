import { defineConfig, resolveConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

const PORT = 3301;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      api: {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
});
