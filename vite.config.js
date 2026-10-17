import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function asymptoteExtensionDashboardPlugin() {
  return {
    name: 'asymptote-extension-dashboard-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url.startsWith('/data/') || url === '/data') {
          const relativePath = url.replace(/^\/+data\/?/, '');
          const filePath = relativePath 
            ? path.resolve(__dirname, 'extension', 'data', relativePath)
            : path.resolve(__dirname, 'extension', 'data', 'manifest.json');
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', 'application/json');
            return fs.createReadStream(filePath).pipe(res);
          }
        }
        next();
      });
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'client/dist');
      const extDashboardDir = path.resolve(__dirname, 'extension/dashboard');
      if (fs.existsSync(distDir)) {
        if (fs.existsSync(extDashboardDir)) {
          fs.rmSync(extDashboardDir, { recursive: true, force: true });
        }
        fs.mkdirSync(extDashboardDir, { recursive: true });
        fs.cpSync(distDir, extDashboardDir, { recursive: true });
      }
      const extDataDir = path.resolve(__dirname, 'extension/data');
      const distDataDir = path.resolve(distDir, 'data');
      if (fs.existsSync(extDataDir)) {
        fs.cpSync(extDataDir, distDataDir, { recursive: true });
      }
    }
  };
}

export default defineConfig({
  root: 'client',
  base: './',
  plugins: [react(), tailwindcss(), asymptoteExtensionDashboardPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      'cn': path.resolve(__dirname, './client/src/lib/utils.js'),
    },
  },
  build: {
    outDir: '../client/dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
