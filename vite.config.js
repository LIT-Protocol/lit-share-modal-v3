import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/shareModal/ShareModal.jsx"),
      name: "lit-share-modal",
      fileName: (format) => `lit-share-modal.${format}.js`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ["lit-js-sdk", "react", "react-dom"],
      output: {
        globals: {
          React: "react",
          ReactDom: "react-dom",
          LitJsSdk: "lit-js-sdk",
        },
      },
    },
  },
  plugins: [react()],
  define: {
    global: {},
  },
})
