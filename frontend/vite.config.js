import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.png"],
      manifest: {
        name: "TrendZ",
        short_name: "TrendZ",
        description: "Trendy products & deals in one place",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/",
});
