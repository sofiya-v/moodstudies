// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({

    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Syne Mono',
            cssVariable: '--font-syne-mono',
        },
        {
            provider: fontProviders.google(),
            name: 'Silkscreen',
            cssVariable: '--font-silkscreen',
        },

    ],
});


