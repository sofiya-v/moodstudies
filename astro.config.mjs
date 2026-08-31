// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://moodstudies.com',

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
        {
            provider: fontProviders.google(),
            name: 'VT323',
            cssVariable: '--font-vt323',
        },
    ],

    integrations: [mdx()],
});