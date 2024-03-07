import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isProduction = mode === 'production';

  const devEnv = loadEnv(mode, process.cwd(), '');
  const prodEnv = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name!.split('.').at(1) as string;
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
    },
    define: {
      'process.env': isProduction ? prodEnv : devEnv,
    },
    plugins: [react(), WindiCSS(), tsconfigPaths()],
    server: {
      host: true,
      port: 3000,
    },
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
  });
};
