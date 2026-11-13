import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('echarts') || id.includes('zrender')) {
              return 'vendor-echarts';
            }
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-recharts';
            }
            if (id.includes('chart.js')) {
              return 'vendor-chartjs';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react-core';
            }
            return 'vendor-misc';
          }
          if (id.includes('src/data/gsirfExcelData.json')) {
            return 'data-excel-master';
          }
          if (id.includes('src/data/gsirfFullComparisonData.json')) {
            return 'data-comparison';
          }
        }
      }
    }
  }
})
