<template>
    <AppLayout>
        <article class="journey-page">
            <header class="page-heading" data-reveal="stagger">
                <h1>{{ t('journey.title') }}</h1>
                <p>{{ t('journey.summary') }}</p>
            </header>
            <section v-for="block in affiliationBlocks" :key="block.summary.company + block.summary.period" class="journey-page__chapter">
                <header data-reveal="up">
                    <p class="journey-page__period">{{ block.summary.period }}</p>
                    <h2>{{ block.summary.company }}</h2>
                    <p>{{ block.summary.team }}</p>
                </header>
                <div class="journey-page__body">
                    <p class="journey-page__intro">{{ block.summary.intro }}</p>
                    <ul class="journey-page__roles">
                        <li v-for="role in block.summary.roles" :key="role">{{ role }}</li>
                    </ul>
                    <ol class="journey-page__timeline" data-reveal="stagger">
                        <li v-for="item in block.timeline" :key="item.period + item.title">
                            <p>{{ item.period }}</p>
                            <div>
                                <h3>{{ item.title }}</h3>
                                <p>{{ item.description }}</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </section>
            <section class="journey-page__highlights" data-reveal="up">
                <h2>{{ t('highlights.title') }}</h2>
                <div>
                    <section v-for="key in highlightKeys" :key="key">
                        <h3>{{ t(`highlights.${key}`) }}</h3>
                        <ul>
                            <li v-for="item in content.highlights[key]" :key="item">{{ item }}</li>
                        </ul>
                    </section>
                </div>
            </section>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
const { t, locale, content } = useLocale();
const { affiliationBlocks } = useJourneyView();
const highlightKeys = ['awards', 'certifications', 'roles', 'activities'] as const;

usePortfolioSeo(() => ({
    title: t('journey.metaTitle'),
    description: t('journey.metaDescription'),
    image: '/assets/images/common/og/journey.jpg',
    imageAlt: t('journey.ogImageAlt'),
    imageWidth: 1200,
    imageHeight: 630,
    path: '/journey',
    locale: locale.value,
    schemaType: 'AboutPage',
    breadcrumbs: [
        { name: t('footer.homeLink'), path: '/' },
        { name: t('journey.title'), path: '/journey' },
    ],
}));
</script>

<style lang="scss" src="~/assets/style/pages/_journey.scss"></style>
