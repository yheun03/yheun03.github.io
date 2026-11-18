<template>
    <AppLayout home>
        <PortfolioHero />
        <PortfolioProof />
        <PortfolioAboutIntro />
        <PortfolioShowcase />
        <PortfolioToolbox />
        <PortfolioHow />
    </AppLayout>
</template>

<script setup lang="ts">
const { t, locale } = useLocale();

usePortfolioSeo(() => ({
    title: t('meta.title'),
    description: t('meta.description'),
    ogTitle: t('meta.ogTitle'),
    ogDescription: t('meta.ogDescription'),
    path: '/',
    locale: locale.value,
    imageAlt: t('meta.ogTitle'),
    dateCreated: '2026-04-16T17:24:07+09:00',
    dateModified: '2026-11-18T00:00:00+09:00',
    relatedLinks: ['/about/', '/projects/', '/personal/', '/journey/'],
    significantLinks: ['/projects/', '/journey/'],
}));
</script>

<style lang="scss" src="~/assets/style/home.scss"></style>
