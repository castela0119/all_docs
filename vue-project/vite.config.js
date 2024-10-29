import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './');

  console.log('env ::', env);

  return {
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      quasar()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: env.VITE_PORT || 5173,
      host: env.VITE_HOST || '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_APP_API_URL,  // .env에서 백엔드 API URL 불러오기
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  };
});