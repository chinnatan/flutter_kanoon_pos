// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { VitePWA } from "vite-plugin-pwa";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: 'Kanoon POS',
        short_name: 'Kanoon POS',
        theme_color: '#ffffff',
        icons: [
          {
            src: './src/assets/logo.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png',
          },
        ]
        //   {
        //     src: '/pwa-512x512.png', // <== don't remove slash, for testing
        //     sizes: '512x512',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png', // <== don't add slash, for testing
        //     sizes: '512x512',
        //     type: 'image/png',
        //     purpose: ['any', 'maskable'], // testing new type declaration
        //   },
        // ],
      },
      devOptions: {
        enabled: true,
      },
    }),
    VueRouter({
      dts: "src/typed-router.d.ts",
    }),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        {
          "vue-router/auto": ["useRoute", "useRouter"],
        },
      ],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: "src/components.d.ts",
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    Fonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 8080,
    // headers: {

    // },
  },
});
