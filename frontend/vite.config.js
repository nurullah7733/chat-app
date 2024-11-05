import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "public", // Ensures the output directory is named "dist"
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
