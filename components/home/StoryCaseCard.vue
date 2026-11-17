<template>
    <NuxtLink :to="to" class="story-case surface-card" :aria-label="featured ? `${t('story.featuredBadge')}: ${linkLabel}` : linkLabel">
        <figure v-if="cover" class="story-case__media">
            <GalleryEmptyCapture v-if="isPlaceholderCapture(cover)" />
            <BaseMediaImage v-else :src="resolveAppPath(cover)" :alt="title" />
        </figure>
        <p class="story-case__head">
            <span class="story-case__meta">
                <BaseIndexLabel variant="tag" tag="span">{{ tag }}</BaseIndexLabel>
                <span v-if="featured" class="story-case__pin">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M12 17v5M9 3h6M9 3v5l-3 4v3h12v-3l-3-4V3" />
                    </svg>
                    {{ t('story.featuredBadge') }}
                </span>
            </span>
            <span class="story-case__period">{{ period }}</span>
        </p>

        <h3>{{ title }}</h3>
        <p class="story-case__summary">{{ summary }}</p>
        <p v-if="role" class="story-case__role">
            <strong>{{ t('gallery.role') }}</strong
            >{{ role }}
        </p>

        <BaseChipList :items="tech" :aria-label="techAriaLabel" />

        <span class="story-case__cta" aria-hidden="true">
            {{ ctaLabel }}
            <svg
                class="story-case__cta-arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </svg>
        </span>
    </NuxtLink>
</template>

<script setup lang="ts">
import { isPlaceholderCapture } from '~/composables/gallery/useGallery';

defineProps<{
    to: string;
    linkLabel: string;
    tag: string;
    period: string;
    title: string;
    summary: string;
    tech: string[];
    ctaLabel: string;
    techAriaLabel?: string;
    featured?: boolean;
    cover?: string;
    role?: string;
}>();

const { t } = useLocale();
const { resolveAppPath } = useAppPath();
</script>
