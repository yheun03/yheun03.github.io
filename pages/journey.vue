<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/journey" page-variant="journey"
        :footer-text="t('footer.copyright')">
        <article class="silver-journey">
            <header class="silver-page-heading"><h1>{{ t('journey.title') }}</h1><p>{{ t('journey.summary') }}</p></header>
            <section v-for="block in affiliationBlocks" :key="block.summary.company + block.summary.period" class="silver-journey__chapter">
                <header><p class="silver-journey__period">{{ block.summary.period }}</p><h2>{{ block.summary.company }}</h2><p>{{ block.summary.team }}</p></header>
                <div class="silver-journey__body">
                    <p class="silver-journey__intro">{{ block.summary.intro }}</p>
                    <ul class="silver-journey__roles"><li v-for="role in block.summary.roles" :key="role">{{ role }}</li></ul>
                    <ol class="silver-journey__timeline"><li v-for="item in block.timeline" :key="item.period + item.title"><p>{{ item.period }}</p><div><h3>{{ item.title }}</h3><p>{{ item.description }}</p></div></li></ol>
                </div>
            </section>
            <section class="silver-journey__highlights">
                <h2>{{ t('highlights.title') }}</h2>
                <div><section v-for="key in highlightKeys" :key="key"><h3>{{ t(`highlights.${key}`) }}</h3><ul><li v-for="item in content.highlights[key]" :key="item">{{ item }}</li></ul></section></div>
            </section>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
const { t, locale, content } = useLocale();
const layoutLinks = useSubpageLinks();
const { affiliationBlocks } = useJourneyView();
const highlightKeys = ['awards', 'certifications', 'roles', 'activities'] as const;

usePortfolioSeo(() => ({
    title: t('journey.title'),
    description: t('journey.summary'),
    path: '/journey',
    locale: locale.value,
    schemaType: 'AboutPage',
    breadcrumbs: [
        { name: t('footer.homeLink'), path: '/' },
        { name: t('journey.title'), path: '/journey' },
    ],
}));
</script>
