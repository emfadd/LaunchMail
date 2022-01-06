import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import icons from "unplugin-icons/vite";
import iconsResolver from "unplugin-icons/resolver";
import autoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    components({
      dts: true,
      dirs: ["src/components"],
      resolvers: [iconsResolver()],

    }),
    icons({
      compiler: "vue3",
    }),
    autoImport({
      dts: true,
      include: [/\.vue$/],
      imports: ["vue"],
    }),
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
});
