import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input: ['index.html', 'products.html', 'privacy.html', 'commercial-cleaning.html', 'food-beverage-cleaning.html', 'life-sciences-hygiene.html', 'water-treatment.html'] } },
})
