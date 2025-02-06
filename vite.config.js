import {defineConfig, loadEnv} from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import cert from "vite-plugin-mkcert";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, '.', '')
    const host = env.APP_HOST || "localhost"

    return {
        define: {
            'import.meta.env.VITE_APP_URL': JSON.stringify(env?.APP_URL),
            'import.meta.env.APP_KEY': JSON.stringify(env?.APP_KEY)
        },
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/react/index.tsx'],
                refresh: true,
            }),
            cert({
                savePath: './storage/app/private/certs/', // save the generated certificate into certs directory
                force: true, // force generation of certs even without setting https property in the vite config
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'resources/react'),
            },
        },
        server: {
            hmr: {
                host: host
            },
            host: host,
            https: {
                key: './storage/app/private/certs/dev.pem',
                cert: './storage/app/private/certs/cert.pem',
            },
            cors: true
        }
    }
});
