<template>
    <AppLayout>
        <article class="catalog-page section" aria-labelledby="catalog-page-title">
            <header class="catalog-hero" data-reveal="hero">
                <h1 id="catalog-page-title">{{ t('catalog.title') }}</h1>
                <p>{{ t('catalog.introBefore') }} <code>assets/style/base/</code> {{ t('catalog.introAfter') }}</p>
                <nav class="catalog-hero__actions" :aria-label="t('catalog.navigation')">
                    <BaseButton :label="t('catalog.viewTokens')" href="/personal/design-tokens" />
                    <BaseButton :label="t('catalog.viewPersonal')" href="/personal" variant="ghost" />
                    <BaseButton :label="t('catalog.viewHome')" href="/" variant="ghost" />
                </nav>
            </header>

            <section class="catalog-section" data-reveal="up" aria-labelledby="button-section-title">
                <header class="catalog-section__head">
                    <BaseLabel>BaseButton</BaseLabel>
                    <h2 id="button-section-title">{{ t('catalog.buttonTitle') }}</h2>
                    <p>{{ t('catalog.buttonDescription') }}</p>
                </header>
                <div class="catalog-row">
                    <BaseButton label="Primary" />
                    <BaseButton label="Ghost" variant="ghost" />
                    <BaseButton label="Disabled" disabled />
                    <BaseButton href="#button-section-title" label="Anchor" variant="ghost" />
                    <BaseButton to="/projects" label="NuxtLink" variant="ghost" />
                </div>
            </section>

            <section class="catalog-section" data-reveal="up" aria-labelledby="label-section-title">
                <header class="catalog-section__head">
                    <BaseLabel>BaseLabel</BaseLabel>
                    <h2 id="label-section-title">{{ t('catalog.labelTitle') }}</h2>
                    <p>{{ t('catalog.labelDescription') }}</p>
                </header>
                <div class="catalog-row catalog-row--wrap">
                    <BaseLabel label="Default" />
                    <BaseLabel label="Work" />
                    <BaseLabel label="Personal" />
                    <BaseLabel label="Toolbox" />
                    <BaseLabel label="Highlight" />
                    <BaseLabel label="Technical" />
                </div>
            </section>

            <section class="catalog-section" data-reveal="up" aria-labelledby="badge-section-title">
                <header class="catalog-section__head">
                    <BaseLabel>BaseBadge / BaseAccentBadge</BaseLabel>
                    <h2 id="badge-section-title">{{ t('catalog.badgeTitle') }}</h2>
                    <p>{{ t('catalog.badgeDescription') }}</p>
                </header>
                <div class="catalog-row catalog-row--wrap">
                    <BaseBadge>Default</BaseBadge>
                    <BaseBadge tone="work">Work</BaseBadge>
                    <BaseBadge tone="toolbox" size="sm">Toolbox · size="sm"</BaseBadge>
                    <BaseAccentBadge label="Featured" />
                </div>
            </section>

            <section class="catalog-section" data-reveal="up" aria-labelledby="index-section-title">
                <header class="catalog-section__head">
                    <BaseLabel>BaseIndexLabel</BaseLabel>
                    <h2 id="index-section-title">{{ t('catalog.indexTitle') }}</h2>
                    <p>{{ t('catalog.indexDescription') }}</p>
                </header>
                <div class="catalog-row catalog-row--wrap">
                    <BaseIndexLabel value="01" />
                    <BaseIndexLabel value="02" />
                    <BaseIndexLabel variant="tag"
                        >SI PROJECT
                        <BaseAccentBadge :label="t('story.featuredBadge')" />
                    </BaseIndexLabel>
                </div>
            </section>

            <section class="catalog-section" data-reveal="up" aria-labelledby="chip-section-title">
                <header class="catalog-section__head">
                    <BaseLabel>BaseChipList</BaseLabel>
                    <h2 id="chip-section-title">{{ t('catalog.chipTitle') }}</h2>
                    <p>{{ t('catalog.chipDescription') }}</p>
                </header>
                <BaseChipList :items="sampleTech" :aria-label="t('catalog.sampleTech')" />
            </section>

            <section class="catalog-section" data-reveal="up" aria-labelledby="media-section-title">
                <header class="catalog-section__head">
                    <BaseLabel label="BaseMediaImage" />
                    <h2 id="media-section-title">{{ t('catalog.mediaTitle') }}</h2>
                    <p>{{ t('catalog.mediaDescription') }}</p>
                </header>
                <BaseMediaImage
                    class="catalog-preview"
                    :src="resolveAppPath('/assets/images/projects/framework/image-01.webp')"
                    :alt="t('catalog.sectionDemoTitle')"
                    sizes="(min-width: 641px) 55vw, 90vw"
                />
            </section>

            <section class="catalog-section" data-reveal="up" aria-labelledby="stat-section-title">
                <header class="catalog-section__head">
                    <BaseLabel>BaseStatList</BaseLabel>
                    <h2 id="stat-section-title">{{ t('catalog.statTitle') }}</h2>
                    <p>{{ t('catalog.statDescription') }}</p>
                </header>
                <BaseStatList :stats="sampleStats" :aria-label="t('catalog.sampleStats')" />
            </section>

            <section class="catalog-section" data-reveal="up" aria-labelledby="section-title-section-title">
                <header class="catalog-section__head">
                    <BaseLabel>BaseSectionTitle</BaseLabel>
                    <h2 id="section-title-section-title">{{ t('catalog.sectionTitle') }}</h2>
                    <p>{{ t('catalog.sectionDescription') }}</p>
                </header>
                <BaseSectionTitle
                    title-id="catalog-section-title-demo"
                    eyebrow="Works"
                    :title="t('catalog.sectionDemoTitle')"
                    :description="t('catalog.sectionDemoDescription')"
                />
            </section>

            <section class="catalog-section" data-reveal="up" aria-labelledby="card-section-title">
                <header class="catalog-section__head">
                    <BaseLabel>BaseCard / StoryCaseCard</BaseLabel>
                    <h2 id="card-section-title">{{ t('catalog.cardTitle') }}</h2>
                    <p>{{ t('catalog.cardDescription') }}</p>
                </header>
                <div class="catalog-grid">
                    <BaseCard>
                        <BaseLabel label="Career" />
                        <h3>BaseCard</h3>
                        <p>{{ t('catalog.baseCardDescription') }}</p>
                    </BaseCard>
                    <StoryCaseCard
                        v-if="sampleWork"
                        :to="`/projects/${sampleWork.id}`"
                        :link-label="`${sampleWork.title}, ${t('catalog.caseCta')}`"
                        :tag="sampleWork.type"
                        :period="sampleWork.period"
                        :title="sampleWork.title"
                        :summary="sampleWork.introduction"
                        :tech="sampleWork.tech"
                        :cta-label="t('catalog.caseCta')"
                        :tech-aria-label="t('catalog.caseTech')"
                    />
                </div>
            </section>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
const { t, content, locale } = useLocale();
const { resolveAppPath } = useAppPath();

const sampleTech = computed(() => content.value.componentCatalogSamples.tech);
const sampleStats = computed(() => content.value.profile.stats);
const { data: sampleWork } = await useGalleryRouteWork('career', 'toms');

usePortfolioSeo(() => ({
    title: t('catalog.componentsMetaTitle'),
    description: t('catalog.componentsMetaDescription'),
    path: '/personal/components',
    locale: locale.value,
    type: 'article',
    noindex: true,
}));
</script>

<style scoped>
.catalog-page {
    display: grid;
    gap: var(--section-gap);
    width: 100%;
    max-width: none;
    margin: 0;
    padding: var(--section-pad-y) var(--page-pad-x);
}

.catalog-hero,
.catalog-section {
    display: grid;
    gap: 32px 8%;
}

.catalog-hero {
    grid-template-columns: 1.3fr 1fr;
    max-width: 1080px;
    padding-block: 0 64px;
    border-bottom: 1px solid var(--color-divider-subtle);
}

.catalog-section {
    grid-template-columns: 1fr 1.8fr;
    padding: 56px 0;
    border-top: 1px solid var(--color-divider);
}

.catalog-section > :not(.catalog-section__head) {
    grid-column: 2;
}

.catalog-section__head {
    grid-row: 1;
    margin: 0;
}

.catalog-hero h1,
.catalog-section__head h2 {
    margin: 0;
    font-family: var(--font-display);
    letter-spacing: var(--tracking-tight);
}

.catalog-hero h1 {
    max-width: 18ch;
    font-size: var(--font-size-display-2);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-display);
}

.catalog-section__head h2 {
    font-size: var(--font-size-display-4);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-heading);
}

.catalog-section__head h2 {
    font-size: 32px;
    font-weight: 400;
    letter-spacing: -0.04em;
}

.catalog-hero h1 {
    grid-row: span 2;
    color: var(--color-primary);
    font-family: var(--font-editorial);
    font-size: var(--page-title-size);
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.055em;
    word-break: keep-all;
}

.catalog-hero code {
    overflow-wrap: anywhere;
}

.catalog-hero p,
.catalog-section__head p {
    max-width: 52ch;
    margin: 0;
    color: var(--color-text-muted);
    line-height: var(--line-height-body);
}

.catalog-hero p {
    font-size: 20px;
    line-height: 1.7;
}

.catalog-hero__actions {
    margin-top: var(--space-6);
}

.catalog-hero__actions,
.catalog-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    align-items: center;
}

.catalog-row--wrap {
    align-items: flex-start;
}

.catalog-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(24px, 2.5vw, 40px);
}

.catalog-preview {
    display: block;
    width: 100%;
    height: auto;
}

@media (max-width: 767px) {
    .catalog-page {
        width: 100%;
        padding: var(--section-pad-y) var(--page-pad-x);
    }

    .catalog-hero__actions {
        display: grid;
    }

    .catalog-hero__actions :deep(.base-button),
    .catalog-row :deep(.base-button) {
        width: 100%;
        justify-content: center;
    }

    .catalog-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}
@media (max-width: 640px) {
    .catalog-hero,
    .catalog-section {
        grid-template-columns: 1fr;
        gap: 36px;
    }

    .catalog-hero h1,
    .catalog-section__head {
        grid-row: auto;
    }

    .catalog-section > :not(.catalog-section__head) {
        grid-column: 1;
    }
}
</style>
