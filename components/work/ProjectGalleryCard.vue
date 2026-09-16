<template>
    <NuxtLink :to="to" class="gallery-card" data-reveal="up"
        :class="viewMode === 'editorial' ? 'gallery-editorial__entry' : 'gallery-card--grid'"
        :aria-label="cardAriaLabel">
        <template v-if="viewMode === 'editorial'">
            <div class="gallery-editorial__entry-poster">
                <p class="gallery-editorial__entry-kicker">
                    <span>{{ work.duration }}</span>
                    <span aria-hidden="true">•</span>
                    <span>{{ work.type }}</span>
                    <span v-if="work.period" aria-hidden="true">•</span>
                    <span v-if="work.period">{{ work.period }}</span>
                </p>

                <div class="gallery-editorial__entry-hero">
                    <component :is="headingTag" class="gallery-editorial__entry-title">{{ work.title }}</component>
                    <span class="gallery-editorial__entry-rule" aria-hidden="true" />
                    <p class="gallery-editorial__entry-label" aria-hidden="true">{{ entryLabel }}</p>
                </div>

                <p class="gallery-editorial__entry-dek">{{ work.introduction }}</p>

                <ul v-if="work.languages.length" class="gallery-editorial__entry-tags"
                    :aria-label="t('gallery.languages')">
                    <li v-for="lang in work.languages" :key="lang">{{ lang }}</li>
                </ul>

                <div class="gallery-editorial__entry-media">
                    <GalleryEmptyCapture v-if="isPlaceholderCover" />
                    <span v-else class="gallery-editorial__entry-screen">
                        <BaseMediaImage :src="coverSrc" :alt="coverAlt" :priority="priority" />
                    </span>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="gallery-card__media">
                <GalleryEmptyCapture v-if="isPlaceholderCover" />
                <span v-else class="gallery-card__screen">
                    <BaseMediaImage :src="coverSrc" :alt="coverAlt" :priority="priority" />
                </span>
            </div>
            <div class="gallery-card__body">
                <p class="gallery-card__meta">
                    <span>{{ work.duration }}</span>
                    <span aria-hidden="true"> / </span>
                    <span>{{ work.type }}</span>
                </p>
                <component :is="headingTag" class="gallery-card__title">{{ work.title }}</component>
                <p class="gallery-card__excerpt">{{ work.introduction }}</p>
                <ul v-if="work.languages.length" class="gallery-card__langs" :aria-label="t('gallery.languages')">
                    <li v-for="lang in work.languages" :key="lang">{{ lang }}</li>
                </ul>
            </div>
        </template>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';
import { type GalleryViewMode, isPlaceholderCapture } from '~/composables/gallery/useGallery';

const props = withDefaults(
    defineProps<{
        work: WorkItem;
        to: string;
        viewMode?: GalleryViewMode;
        entryLabel?: string;
        priority?: boolean;
        headingTag?: 'h2' | 'h3';
    }>(),
    {
        viewMode: 'editorial',
        priority: false,
        headingTag: 'h2',
    },
);

const { t } = useLocale();
const { resolveAppPath } = useAppPath();

const entryLabel = computed(() => props.entryLabel ?? t('gallery.viewEntry'));

const cardAriaLabel = computed(() => {
    const title = props.work.title;
    return `${title}, ${entryLabel.value}`;
});

const coverCapture = computed(() => props.work.thumbnail ?? props.work.captures[0] ?? '');
const coverSrc = computed(() => resolveAppPath(coverCapture.value));
const isPlaceholderCover = computed(() => isPlaceholderCapture(coverCapture.value));

const coverAlt = computed(() => {
    if (isPlaceholderCover.value) return '';
    const title = props.work.title;
    return t('gallery.captureCardAlt').replace('{title}', title);
});

</script>
