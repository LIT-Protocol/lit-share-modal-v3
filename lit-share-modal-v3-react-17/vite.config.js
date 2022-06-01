import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "../src/shareModal/ShareModal.jsx"),
      name: "lit-share-modal-v3-react-17",
      fileName: (format) => `lit-share-modal-v3-react-17.${format}.js`,
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ["lit-js-sdk", "react", "react-dom"],
      inlineDynamicImports: true,
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
