import { fileURLToPath } from 'node:url';
import { defineConfig } from 'waku/config';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      dedupe: ['waku'],
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    plugins: [tailwindcss(), fumadocsMdx()],
  },
});
