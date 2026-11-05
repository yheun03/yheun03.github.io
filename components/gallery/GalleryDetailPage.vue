<template>
    <GalleryLayout :variant="variant" :base-path="config.basePath">
        <article class="gallery-detail gallery-page--editorial section" :class="galleryVariantClass">
            <nav class="gallery-detail__breadcrumb" data-reveal="up" :aria-label="t('gallery.breadcrumbLabel')">
                <NuxtLink :to="config.basePath" class="gallery-detail__breadcrumb-link">
                    <svg
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
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    {{ t(config.listLabelKey) }}
                </NuxtLink>
            </nav>

            <header class="gallery-detail__header gallery-detail__hero">
                <div class="gallery-detail__hero-copy" data-reveal="right" data-reveal-delay="100">
                    <h1 class="gallery-detail__title">{{ work.title }}</h1>
                    <p class="gallery-detail__intro">{{ work.introduction }}</p>
                    <dl class="gallery-detail__hero-meta">
                        <div>
                            <dt>{{ metaLabels.type }}</dt>
                            <dd>{{ work.type }}</dd>
                        </div>
                        <div v-if="work.period">
                            <dt>{{ metaLabels.period }}</dt>
                            <dd>{{ work.period }}</dd>
                        </div>
                        <div v-if="work.duration">
                            <dt>{{ t('gallery.duration') }}</dt>
                            <dd>{{ work.duration }}</dd>
                        </div>
                        <div>
                            <dt>{{ t('gallery.role') }}</dt>
                            <dd>{{ work.role }}</dd>
                        </div>
                    </dl>
                    <p v-if="work.links?.length" class="gallery-detail__links">
                        <BaseButton
                            v-for="link in work.links"
                            :key="link.href"
                            :label="projectLinkLabel(link)"
                            :href="link.href"
                            :aria-label="projectLinkAriaLabel(link)"
                            :variant="isGithubLink(link.href) ? 'ghost' : 'primary'"
                        />
                    </p>
                </div>
                <figure
                    class="gallery-detail__cover"
                    data-reveal="scale"
                    :class="{ 'gallery-detail__cover--empty': isPlaceholderCapture(coverCapture) }"
                >
                    <GalleryEmptyCapture v-if="isPlaceholderCapture(coverCapture)" />
                    <BaseMediaImage v-else :src="resolveAppPath(coverCapture)" :alt="captureAlt(0)" priority />
                </figure>
            </header>

            <dl class="gallery-detail__summary">
                <div v-if="work.myWorks.length">
                    <dt>{{ t('gallery.solutionLabel') }}</dt>
                    <dd>{{ work.myWorks[0] }}</dd>
                </div>
                <div v-if="work.achievements.length">
                    <dt>{{ t('gallery.results') }}</dt>
                    <dd>{{ work.achievements[0] }}</dd>
                </div>
                <div v-if="work.points.length">
                    <dt>{{ t('gallery.points') }}</dt>
                    <dd>{{ work.points[0] }}</dd>
                </div>
            </dl>

            <nav class="gallery-detail__section-nav" :aria-label="t('gallery.projectNavigation')">
                <a :href="`#${briefTitleId}`">{{ t('gallery.contributions') }}</a>
                <a :href="`#${techTitleId}`">{{ t('gallery.technologies') }}</a>
                <a :href="`#${capturesTitleId}`">{{ t('gallery.captures') }}</a>
            </nav>

            <section class="gallery-detail__brief" :aria-labelledby="briefTitleId">
                <header class="gallery-detail__section-intro" data-reveal="up">
                    <h2 :id="briefTitleId">{{ t('gallery.contributions') }}</h2>
                </header>

                <div class="gallery-detail__brief-grid">
                    <section class="gallery-detail__brief-card gallery-detail__brief-card--wide" data-reveal="up">
                        <h3 class="gallery-detail__brief-label">{{ t('gallery.solutionLabel') }}</h3>
                        <ul>
                            <li v-for="item in work.myWorks" :key="item">{{ item }}</li>
                        </ul>
                    </section>
                    <section v-if="work.achievements.length" class="gallery-detail__brief-card" data-reveal="up">
                        <h3 class="gallery-detail__brief-label">{{ t('gallery.results') }}</h3>
                        <ul>
                            <li v-for="item in work.achievements" :key="item">{{ item }}</li>
                        </ul>
                    </section>
                    <section class="gallery-detail__brief-card" data-reveal="up" data-reveal-delay="80">
                        <h3 class="gallery-detail__brief-label">{{ t('gallery.points') }}</h3>
                        <ul>
                            <li v-for="item in work.points" :key="item">{{ item }}</li>
                        </ul>
                    </section>
                </div>
            </section>

            <section class="gallery-detail__technologies" :aria-labelledby="techTitleId" data-reveal="up">
                <header class="gallery-detail__section-intro">
                    <h2 :id="techTitleId">{{ t('gallery.technologies') }}</h2>
                </header>
                <BaseChipList :items="work.tech" :aria-label="t('gallery.technologies')" />
            </section>

            <section class="gallery-detail__story" :aria-labelledby="capturesTitleId">
                <header class="gallery-detail__section-intro gallery-detail__section-intro--story" data-reveal="up">
                    <h2 :id="capturesTitleId">{{ t('gallery.captures') }}</h2>
                    <div v-if="galleryCaptures.length > 1" class="gallery-detail__capture-controls">
                        <span aria-hidden="true">{{ activeCaptureIndex + 1 }} / {{ galleryCaptures.length }}</span>
                        <BaseButton
                            variant="ghost"
                            :aria-label="t('gallery.previousImage')"
                            :disabled="activeCaptureIndex === 0"
                            @click="selectCapture(activeCaptureIndex - 1)"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </BaseButton>
                        <BaseButton
                            variant="ghost"
                            :aria-label="t('gallery.nextImage')"
                            :disabled="activeCaptureIndex === galleryCaptures.length - 1"
                            @click="selectCapture(activeCaptureIndex + 1)"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </BaseButton>
                    </div>
                </header>

                <figure
                    :id="capturePreviewId"
                    class="gallery-detail__figure"
                    :class="{ 'gallery-detail__figure--empty': isPlaceholderCapture(activeCapture) }"
                    data-reveal="up"
                >
                    <div class="gallery-detail__preview-stage">
                        <GalleryEmptyCapture v-if="isPlaceholderCapture(activeCapture)" />
                        <BaseMediaImage
                            v-else
                            :key="activeCapture"
                            :src="resolveAppPath(activeCapture)"
                            :alt="captureAlt(activeCaptureIndex)"
                            priority
                        />
                    </div>
                    <figcaption v-if="!isPlaceholderCapture(activeCapture)" aria-live="polite" aria-atomic="true">
                        <span>{{ String(activeCaptureIndex + 1).padStart(2, '0') }} / {{ String(galleryCaptures.length).padStart(2, '0') }}</span
                        >{{ captureAlt(activeCaptureIndex) }}
                    </figcaption>
                </figure>

                <ol
                    v-if="galleryCaptures.length > 1"
                    ref="captureThumbnailsRef"
                    class="gallery-detail__thumbnails"
                    :aria-label="t('gallery.captures')"
                    @keydown="handleCaptureKeydown"
                >
                    <li v-for="(capture, index) in galleryCaptures" :key="`${capture}-${index}`">
                        <button
                            type="button"
                            class="gallery-detail__thumbnail"
                            :class="{ 'gallery-detail__thumbnail--active': activeCaptureIndex === index }"
                            :aria-label="t('gallery.captureDotLabel').replace('{index}', String(index + 1))"
                            :aria-pressed="activeCaptureIndex === index"
                            :aria-controls="capturePreviewId"
                            @click="selectCapture(index)"
                        >
                            <BaseMediaImage v-if="!isPlaceholderCapture(capture)" :src="resolveAppPath(capture)" alt="" />
                            <span class="gallery-detail__thumbnail-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                        </button>
                    </li>
                </ol>
            </section>

            <footer class="gallery-detail__end" data-reveal="up">
                <h2 class="gallery-detail__next-title">{{ navLabels.next }}</h2>
                <nav class="gallery-detail__next-list" :aria-label="navLabels.next">
                    <NuxtLink v-for="item in nextWorks" :key="item.id" :to="`${config.basePath}/${item.id}`">
                        <span>{{ item.title }}</span>
                        <svg
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
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                        </svg>
                    </NuxtLink>
                </nav>
                <BaseButton :to="config.basePath" :label="t(detailEndCtaKey)" variant="ghost">
                    <svg
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
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    {{ t(detailEndCtaKey) }}
                </BaseButton>
            </footer>
        </article>
    </GalleryLayout>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';
import { type GalleryArchiveVariant, getGalleryVariantConfig, isPlaceholderCapture, useGalleryRouteWorks } from '~/composables/gallery/useGallery';

const props = defineProps<{
    variant: GalleryArchiveVariant;
    work: WorkItem;
}>();

const { t, locale } = useLocale();
const { resolveAppPath } = useAppPath();
const config = getGalleryVariantConfig(props.variant);
const galleryVariantClass = computed(() => `gallery-page--${props.variant}`);
const capturesTitleId = `gallery-${props.variant}-captures`;
const briefTitleId = `gallery-${props.variant}-brief`;
const techTitleId = `gallery-${props.variant}-technologies`;
const capturePreviewId = `gallery-${props.variant}-preview`;

const detailEndCtaKey = computed(() => (props.variant === 'career' ? 'gallery.detailEndBackCareer' : 'gallery.detailEndBackPersonal'));
const galleryCaptures = computed(() => (props.work.captures.length ? props.work.captures : ['']));
const activeCaptureIndex = ref(0);
const captureThumbnailsRef = ref<HTMLOListElement | null>(null);
const activeCapture = computed(() => galleryCaptures.value[activeCaptureIndex.value] ?? galleryCaptures.value[0] ?? '');

watch(
    () => props.work.id,
    () => {
        activeCaptureIndex.value = 0;
    },
);

async function selectCapture(index: number, focusThumbnail = false) {
    activeCaptureIndex.value = Math.max(0, Math.min(index, galleryCaptures.value.length - 1));
    await nextTick();
    const rail = captureThumbnailsRef.value;
    const button = rail?.querySelectorAll<HTMLButtonElement>('button')[activeCaptureIndex.value];
    if (!rail || !button) return;
    if (focusThumbnail) button.focus({ preventScroll: true });
    rail.scrollTo({
        left: button.offsetLeft - (rail.clientWidth - button.offsetWidth) / 2,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
}

function handleCaptureKeydown(event: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const buttons = Array.from(captureThumbnailsRef.value?.querySelectorAll('button') ?? []);
    const focusedIndex = buttons.indexOf(event.target as HTMLButtonElement);
    let index = focusedIndex >= 0 ? focusedIndex : activeCaptureIndex.value;
    if (event.key === 'ArrowLeft') index -= 1;
    if (event.key === 'ArrowRight') index += 1;
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = galleryCaptures.value.length - 1;
    selectCapture(index, true);
}

const coverCapture = computed(() => props.work.thumbnail || galleryCaptures.value[0] || '');
const works = useGalleryRouteWorks(props.variant);
const currentWorkIndex = computed(() => works.value.findIndex((item) => item.id === props.work.id));
const nextWorks = computed(() => {
    if (works.value.length < 2 || currentWorkIndex.value < 0) return [];
    return Array.from(
        { length: Math.min(4, works.value.length - 1) },
        (_, offset) => works.value[(currentWorkIndex.value + offset + 1) % works.value.length],
    );
});
const metaLabels = computed(() => ({
    type: t('gallery.type'),
    period: t('gallery.period'),
}));
const navLabels = computed(() => ({
    next: t('gallery.nextProject'),
}));

function captureAlt(index: number) {
    return t('gallery.captureAlt')
        .replace('{title}', props.work.title)
        .replace('{index}', String(index + 1));
}

function projectLinkAriaLabel(link: NonNullable<WorkItem['links']>[number]) {
    const title = props.work.title;
    const label = link.label;

    return t('gallery.projectLinkLabel').replace('{title}', title).replace('{label}', label);
}

function isGithubLink(href: string) {
    return /github\.com/i.test(href);
}

function projectLinkLabel(link: NonNullable<WorkItem['links']>[number]) {
    if (isGithubLink(link.href)) return 'GitHub';
    return t('gallery.openPage');
}

usePortfolioSeo(() => {
    const coverImage = props.work.captures.find((src) => !isPlaceholderCapture(src));
    const workPath = `${config.basePath}/${props.work.id}/`;
    const workUrl = getPortfolioAbsoluteUrl(workPath);

    return {
        title: `${props.work.title} | ${t(config.metaTitleKey)}`,
        description: props.work.introduction,
        path: workPath,
        locale: locale.value,
        type: 'article',
        image: coverImage,
        imageAlt: coverImage ? captureAlt(0) : undefined,
        keywords: [props.work.title, props.work.type, props.work.role, ...props.work.languages, ...props.work.tech],
        breadcrumbs: [
            { name: t('footer.homeLink'), path: '/' },
            { name: t(config.titleKey), path: config.basePath },
            { name: props.work.title, path: workPath },
        ],
        mainEntity: {
            '@type': 'CreativeWork',
            '@id': `${workUrl}#project`,
            url: workUrl,
            name: props.work.title,
            description: props.work.introduction,
            abstract: props.work.introduction,
            creator: { '@id': 'https://yheun03.github.io/#person' },
            author: { '@id': 'https://yheun03.github.io/#person' },
            mainEntityOfPage: { '@id': `${workUrl}#webpage` },
            inLanguage: locale.value,
            isAccessibleForFree: true,
            genre: props.work.type,
            keywords: [...props.work.languages, ...props.work.tech].join(', '),
            about: [...new Set(props.work.tech)].map((name) => ({ '@type': 'Thing', name })),
            ...(coverImage ? { image: getPortfolioAbsoluteUrl(coverImage) } : {}),
            ...(props.work.links?.length ? { sameAs: props.work.links.map((link) => link.href) } : {}),
        },
    };
});
</script>
