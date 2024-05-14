import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isProduction = mode === 'production';

  return defineConfig({
    server: {
      port: 8000,
      open: true
    },
    plugins: [react(),eslintPlugin()],
    build: {
      outDir: "build",
    },
  });
};
