import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // Build client into server/dist/public so Express can find it
    outDir: path.resolve(import.meta.dirname, "server", "dist", "public"),
    emptyOutDir: true,
    rollupOptions: {
      // Point Vite at your HTML entry
      input: path.resolve(import.meta.dirname, "client", "index.html"),
    };
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
