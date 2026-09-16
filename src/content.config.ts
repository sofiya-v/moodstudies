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
        blueHourCaption: z.string(),
        blueHourAlt: z.string(),
        inkblotSrc: z.string(),
        inkblotResponse: z.string(),
        qResponse1: z.string(),
        qResponse2: z.string(),
        qResponse3: z.string(),
        dreamImageSrc: z.string().optional(),
        dreamImageAlt: z.string().optional(),
        trinketSrc: z.string().optional(),
        trinketAlt: z.string().optional(),
        bio: z.string(),
        observation: z.string(),
        caption: z.object({
            label: z.string().optional(),
            author: z.string().optional(),
            authorUrl: z.url().optional(),
        }).optional(),
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

