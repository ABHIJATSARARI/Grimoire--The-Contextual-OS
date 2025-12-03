import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/grimoire/reality/',
  server: {
    port: 3000
  }
});
