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
            <div ref="posterRef" class="gallery-editorial__entry-poster" :class="{ 'gallery-editorial__entry-poster--split': isSplitLayout }">
                <div class="gallery-editorial__entry-body">
                    <p class="gallery-editorial__entry-kicker">
                        <span v-if="work.duration">{{ work.duration }}</span>
                        <span v-if="work.duration" aria-hidden="true">•</span>
                        <span>{{ work.type }}</span>
                        <span v-if="work.period" aria-hidden="true">•</span>
                        <span v-if="work.period">{{ work.period }}</span>
                    </p>

                    <div class="gallery-editorial__entry-hero">
                        <component :is="headingTag" class="gallery-editorial__entry-title">{{ work.title }}</component>
                    </div>

                    <p class="gallery-editorial__entry-dek">{{ work.introduction }}</p>

                    <ul v-if="work.languages.length" class="gallery-editorial__entry-tags" :aria-label="t('gallery.languages')">
                        <li v-for="lang in work.languages" :key="lang">{{ lang }}</li>
                    </ul>
                </div>

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
                    <span v-if="work.duration">{{ work.duration }}</span>
                    <span v-if="work.duration" aria-hidden="true"> / </span>
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
const posterRef = ref<HTMLElement | null>(null);
const isSplitLayout = ref(false);
let layoutFrame = 0;
let posterObserver: ResizeObserver | undefined;

function updateEditorialLayout() {
    if (!import.meta.client) return;
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(() => {
        const poster = posterRef.value;
        if (!poster || !window.matchMedia('(min-width: 1024px)').matches) {
            isSplitLayout.value = false;
            return;
        }

        // 좌우 배치 후에도 원래 세로 높이로 판단해 레이아웃이 반복 전환되지 않게 한다.
        poster.setAttribute('data-measuring', '');
        const stackedHeight = poster.offsetHeight;
        poster.removeAttribute('data-measuring');
        isSplitLayout.value = stackedHeight >= window.innerHeight * 0.86;
    });
}

watch(
    [posterRef, () => props.work],
    () => {
        posterObserver?.disconnect();
        if (posterRef.value) posterObserver?.observe(posterRef.value);
        updateEditorialLayout();
    },
    { flush: 'post' },
);

onMounted(() => {
    posterObserver = new ResizeObserver(updateEditorialLayout);
    if (posterRef.value) posterObserver.observe(posterRef.value);
    window.addEventListener('resize', updateEditorialLayout, { passive: true });
    updateEditorialLayout();
});

onBeforeUnmount(() => {
    cancelAnimationFrame(layoutFrame);
    posterObserver?.disconnect();
    window.removeEventListener('resize', updateEditorialLayout);
});

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
