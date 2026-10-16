import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    // VIGTIGT: Ret 'Dansk' herunder til navnet på dit nye GitHub repository
    base: '/Dansk/',
    build: {
        chunkSizeWarningLimit: 1200,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                    if (id.includes('top100_translations') || id.includes('verber_translations') || id.includes('translations')) {
                        return 'translations-bundle';
                    }
                    if (id.includes('/data/')) {
                        return 'app-data';
                    }
                }
            }
        }
    },
    server: {
        host: true,
        port: 5175,
        strictPort: true,
        allowedHosts: true
    }
});
