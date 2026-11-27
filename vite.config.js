import { defineConfig } from "vite";

// './' makes asset links relative, so the built site works on GitHub Pages,
// which serves it from /wheelhouse-rebuild/, not from the root
export default defineConfig({
  base: "./",
});
