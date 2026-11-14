import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['MatanzasRiverkeeper.png', 'matanzas-weatherstation-2.jpg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Matanzas Riverkeeper Conditions',
        short_name: 'Matanzas',
        description: 'Live weather conditions and 7-day tidal predictions for the Matanzas River.',
        theme_color: '#1890ff',
        background_color: '#f5f7fa',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-map-tiles',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    }),
    {
      name: 'api-proxies',
      configureServer(server) {
        server.middlewares.use('/sensestream', async (req, res) => {
          const targetUrl = 'https://' + 'api.sensestream.org' + req.url;
          try {
            const response = await fetch(targetUrl, {
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0'
              }
            });
            const data = await response.text();
            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (err: any) {
            console.error('SenseStream proxy failed:', err);
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });

        server.middlewares.use('/noaa', async (req, res) => {
          const targetUrl = 'https://' + 'api.tidesandcurrents.noaa.gov' + req.url;
          try {
            const response = await fetch(targetUrl, {
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'MatanzasApp/1.0'
              }
            });
            const data = await response.text();
            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (err: any) {
            console.error('NOAA proxy failed:', err);
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 5173,
    hmr: true
  }
});
