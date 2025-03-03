import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          routing: ['react-router-dom'],
          animations: ['framer-motion'],
          database: ['@supabase/supabase-js'],
          query: ['@tanstack/react-query'],
          vercel: ['@vercel/analytics', '@vercel/speed-insights']
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      '@supabase/supabase-js', 
      '@tanstack/react-query',
      '@vercel/analytics',
      '@vercel/speed-insights'
    ]
  }
});
