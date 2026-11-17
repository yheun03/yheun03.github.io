<template>
    <NuxtLink
        :to="to"
        class="gallery-card"
        data-reveal="up"
        :data-reveal-delay="revealDelay"
        :class="viewMode === 'editorial' ? 'gallery-editorial__entry' : 'gallery-card--grid'"
        :aria-label="cardAriaLabel"
    >
        <template v-if="viewMode === 'editorial'">
            <div class="gallery-editorial__entry-poster">
                <div class="gallery-editorial__entry-media">
                    <GalleryEmptyCapture v-if="isPlaceholderCover" />
                    <span v-else class="gallery-editorial__entry-screen">
                        <BaseMediaImage :src="coverSrc" :alt="coverAlt" :priority="priority" />
                    </span>
                </div>

                <div class="gallery-editorial__entry-head">
                    <p class="gallery-editorial__entry-kicker">{{ work.type }}</p>
                    <div class="gallery-editorial__entry-hero">
                        <component :is="headingTag" class="gallery-editorial__entry-title">{{ work.title }}</component>
                    </div>
                    <p v-if="work.period || work.duration" class="gallery-editorial__entry-period">
                        <span v-if="work.period">{{ work.period }}</span>
                        <span v-if="work.period && work.duration" aria-hidden="true"> / </span>
                        <span v-if="work.duration">{{ work.duration }}</span>
                    </p>
                </div>

                <div class="gallery-editorial__entry-body">
                    <p class="gallery-editorial__entry-dek">{{ work.introduction }}</p>
                    <dl class="gallery-editorial__entry-role">
                        <dt>{{ t('gallery.role') }}</dt>
                        <dd>{{ work.role }}</dd>
                    </dl>
                    <ul v-if="work.languages.length" class="gallery-editorial__entry-tags" :aria-label="t('gallery.languages')">
                        <li v-for="lang in work.languages" :key="lang">{{ lang }}</li>
                    </ul>
                    <span class="gallery-editorial__entry-label" aria-hidden="true">{{ t('story.caseCta') }}</span>
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
                    <span v-if="work.duration">{{ work.duration }}</span>
                    <span v-if="work.duration" aria-hidden="true"> / </span>
                    <span>{{ work.type }}</span>
                </p>
                <component :is="headingTag" class="gallery-card__title">{{ work.title }}</component>
                <p class="gallery-card__excerpt">{{ work.introduction }}</p>
                <p class="gallery-card__role">
                    <strong>{{ t('gallery.role') }}</strong
                    >{{ work.role }}
                </p>
                <ul v-if="work.languages.length" class="gallery-card__langs" :aria-label="t('gallery.languages')">
                    <li v-for="lang in work.languages" :key="lang">{{ lang }}</li>
                </ul>
                <span class="gallery-card__cta" aria-hidden="true">{{ t('story.caseCta') }} <span>→</span></span>
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
        revealDelay?: number;
    }>(),
    {
        viewMode: 'editorial',
        priority: false,
        headingTag: 'h2',
        revealDelay: 0,
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
