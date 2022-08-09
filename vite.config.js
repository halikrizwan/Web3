import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/",
  plugins: [react()],
  server: { 
    host: '0.0.0.0'
  },
  define: {
    'process.env': {},
     global: {},
  },
  build: {
    chunkSizeWarningLimit: 1600,
		rollupOptions: {
			plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })],
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) return id.toString().split('node_modules/')[1].split('/')[0].toString();
      }
      },
		},
  },
  resolve: {
    alias: {
      https: 'agent-base',
      web3: 'web3/dist/web3.min.js',
    },
  },
})

