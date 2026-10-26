import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://<user>.github.io/tokyo-trip/, so every asset URL needs the repo sub-path.
export default defineConfig({
  base: "/tokyo-trip/",
  plugins: [react()],
});
