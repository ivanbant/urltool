import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    origin: "http://0.0.0.0:8080",
    watch: {
      usePolling: true,
    },
    fs: {
      cachedChecks: false,
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@screens": path.resolve(__dirname, "./src/screens"),
    },
  },
});
