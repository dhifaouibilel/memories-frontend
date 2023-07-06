import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // resolve: {
  //   alias: [
  //     {
  //       find: "common",
  //       replacement: resolve(__dirname, "src/common"),
  //     },
  //   ],
  // },
  server: {
    host: 'localhost',
    port: 5173,
    origin: 'http://localhost:5173',
  },
  plugins: [react()],
});