<template>
    <GalleryLayout :variant="variant" :base-path="config.basePath">
        <article class="gallery-detail gallery-page--editorial section" :class="galleryVariantClass">
            <nav class="gallery-detail__breadcrumb" data-reveal="up" :aria-label="t('gallery.breadcrumbLabel')">
                <NuxtLink :to="config.basePath" class="gallery-detail__breadcrumb-link"> ← {{ t(config.listLabelKey) }}
                </NuxtLink>
            </nav>

            <header class="gallery-detail__header gallery-detail__hero">
                <figure class="gallery-detail__cover" data-reveal="scale"
                    :class="{ 'gallery-detail__cover--empty': isPlaceholderCapture(coverCapture) }">
                    <GalleryEmptyCapture v-if="isPlaceholderCapture(coverCapture)" />
                    <BaseMediaImage v-else :src="resolveAppPath(coverCapture)" :alt="captureAlt(0)" priority />
                </figure>
                <div class="gallery-detail__hero-copy" data-reveal="right" data-reveal-delay="100">
                    <p class="gallery-editorial__kicker">{{ t('gallery.detailLabel') }}</p>
                    <h1 class="gallery-detail__title">{{ work.title }}</h1>
                    <p class="gallery-detail__plain-label">{{ t('gallery.overview') }}</p>
                    <p class="gallery-detail__intro">{{ work.introduction }}</p>
                    <p class="gallery-detail__stack-line">{{ work.tech.join(' / ') }}</p>
                    <p v-if="work.links?.length" class="gallery-detail__links">
                        <BaseButton v-for="link in work.links" :key="link.href" :label="projectLinkLabel(link)"
                            :href="link.href" :aria-label="projectLinkAriaLabel(link)"
                            :variant="isGithubLink(link.href) ? 'ghost' : 'primary'" />
                    </p>
                    <dl class="gallery-detail__hero-meta">
                        <div>
                            <dt>{{ metaLabels.type }}</dt>
                            <dd>{{ work.type }}</dd>
                        </div>
                        <div>
                            <dt>{{ metaLabels.period }}</dt>
                            <dd>{{ work.period }}</dd>
                        </div>
                        <div>
                            <dt>{{ t('gallery.duration') }}</dt>
                            <dd>{{ work.duration }}</dd>
                        </div>
                        <div>
                            <dt>{{ t('gallery.role') }}</dt>
                            <dd>{{ work.role }}</dd>
                        </div>
                    </dl>
                </div>
            </header>

            <section class="gallery-detail__brief" :aria-labelledby="briefTitleId">
                <header class="gallery-detail__section-intro" data-reveal="up">
                    <p class="gallery-detail__section-index">01 / PROJECT NOTE</p>
                    <h2 :id="briefTitleId">{{ t('gallery.contributions') }}</h2>
                    <p>{{ t('gallery.storyGuide') }}</p>
                </header>

                <div class="gallery-detail__brief-grid">
                    <section class="gallery-detail__brief-card gallery-detail__brief-card--wide" data-reveal="up">
                        <p class="gallery-detail__brief-label">{{ t('gallery.solutionLabel') }}</p>
                        <ul>
                            <li v-for="item in work.myWorks" :key="item">{{ item }}</li>
                        </ul>
                    </section>
                    <section v-if="work.achievements.length" class="gallery-detail__brief-card" data-reveal="up">
                        <p class="gallery-detail__brief-label">{{ t('gallery.results') }}</p>
                        <ul>
                            <li v-for="item in work.achievements" :key="item">{{ item }}</li>
                        </ul>
                    </section>
                    <section class="gallery-detail__brief-card" data-reveal="up" data-reveal-delay="80">
                        <p class="gallery-detail__brief-label">{{ t('gallery.points') }}</p>
                        <ul>
                            <li v-for="item in work.points" :key="item">{{ item }}</li>
                        </ul>
                    </section>
                </div>
            </section>

            <section :id="capturesTitleId" class="gallery-detail__story" :aria-label="t('gallery.captures')">
                <header class="gallery-detail__section-intro gallery-detail__section-intro--story" data-reveal="up">
                    <p class="gallery-detail__section-index">02 / SCREENS</p>
                    <h2>{{ t('gallery.captures') }}</h2>
                    <p>{{ t('gallery.captureGuide') }}</p>
                </header>
                <article v-for="(capture, index) in galleryCaptures" :key="capture || index"
                    class="gallery-detail__story-block" data-reveal="scale">
                    <figure class="gallery-detail__figure"
                        :class="{ 'gallery-detail__figure--empty': isPlaceholderCapture(capture) }">
                        <GalleryEmptyCapture v-if="isPlaceholderCapture(capture)" />
                        <BaseMediaImage v-else :src="resolveAppPath(capture)" :alt="captureAlt(index)" />
                        <figcaption v-if="!isPlaceholderCapture(capture)">
                            <span>{{ String(index + 1).padStart(2, '0') }}</span>
                            {{ captureCaption(index) }}
                        </figcaption>
                    </figure>
                </article>
            </section>

            <footer class="gallery-detail__end" data-reveal="up">
                <p class="gallery-detail__section-index">03 / KEEP EXPLORING</p>
                <h2 class="gallery-detail__next-title">{{ navLabels.next }}</h2>
                <nav class="gallery-detail__next-list" :aria-label="navLabels.next">
                    <NuxtLink v-for="item in nextWorks" :key="item.id" :to="`${config.basePath}/${item.id}`">
                        <span>{{ item.title }}</span><span aria-hidden="true">↗</span>
                    </NuxtLink>
                </nav>
                <BaseButton :to="config.basePath" :label="`← ${t(detailEndCtaKey)}`" variant="ghost" />
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

const detailEndCtaKey = computed(() => (props.variant === 'career' ? 'gallery.detailEndBackCareer' : 'gallery.detailEndBackPersonal'));
const galleryCaptures = computed(() => (props.work.captures.length ? props.work.captures : ['']));
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

function captureCaption(index: number) {
    const copy = props.work.points[index % props.work.points.length] || props.work.myWorks[index % props.work.myWorks.length];
    return copy || captureAlt(index);
}

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
            abstract: props.work.introduction,
            creator: { '@id': 'https://yheun03.github.io/#person' },
            genre: props.work.type,
            keywords: [...props.work.languages, ...props.work.tech].join(', '),
        },
    };
});
</script>
