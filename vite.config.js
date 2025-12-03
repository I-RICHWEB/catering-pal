import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        favorite: resolve(__dirname, "src/favorite/index.html"),
        learned: resolve(__dirname, "src/learned/index.html"),
        mealDetails: resolve(__dirname, "src/meal-page/index.html"),
        mealList: resolve(__dirname, "src/mealList/index.html"),
      },
    },
  },
});
