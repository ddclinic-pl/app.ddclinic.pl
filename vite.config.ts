import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import TanStackRouterVite from "@tanstack/router-plugin/vite";
import { vitePluginVersionMark } from "vite-plugin-version-mark";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon-180x180.png",
        "maskable-icon-512x512.png",
      ],
      manifest: {
        description: "ddclinic.pl",
        theme_color: "#ffffff",
        background_color: "#2EC6FE",
        orientation: "portrait",
        display: "standalone",
        lang: "pl-PL",
        name: "Dorotowska Dental Clinic",
        short_name: "ddclinic",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    vitePluginVersionMark({
      ifShortSHA: true,
      ifMeta: false,
      ifLog: false,
      ifGlobal: true,
    }),
  ],
  resolve: {
    alias: {
      // https://github.com/tabler/tabler-icons/issues/1233
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
});
