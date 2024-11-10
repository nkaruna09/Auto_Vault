import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // In case you need to externalize certain modules (usually not necessary for regular React apps)
  build: {
    rollupOptions: {
      external: [],
    },
  },
});
