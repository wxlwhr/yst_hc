import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// const path = require("path");
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,"./src"),
    },
  },
  build: {
    terserOptions: {
      compress: {
        // 去掉注释
        drop_console: true,
        // 去掉debugger
        drop_debugger: true,
      },
      // output: {
      //   comments: true,
      // },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 分包
          vue: ["vue", "vue-router", "vuex"],
          elementPlus: ["element-plus"],
          echarts: ["echarts"],
          wangeditor: ["@wangeditor/editor", "@wangeditor/editor-for-vue"],
          moment: ["moment"],
        },
      },
    },
  },


})
