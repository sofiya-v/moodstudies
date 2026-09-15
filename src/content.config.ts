// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const studies = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/studies' }),
    schema: z.object({
        studyNumber: z.string(),
        date: z.string(),
        duration: z.string(),
        artist: z.string(),
        trackId: z.string(),
        blueHourSrc: z.string(),
        blueHourMetadata: z.string(),
        inkblot1Src: z.string(),
        inkblot1Response: z.string(),
        qResponse1: z.string(),
        qResponse2: z.string(),
        qResponse3: z.string(),
        dreamImageSrc: z.string(),
        dreamImageAlt: z.string(),
        trinketSrc: z.string(),
        trinketAlt: z.string(),
        bio: z.string(),
        observation: z.string(),
        caption: z.object({
            label: z.string(),
            author: z.string(),
            authorUrl: z.url(),
        }),
    }),
});

const sightings = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sightings' }),
    schema: z.object({
        image: z.string(),

        date: z.string().optional(),
        time: z.string().optional(),
        location: z.string().optional(),
        author: z.string().optional(),
    }),
});

export const collections = { sightings, studies };

