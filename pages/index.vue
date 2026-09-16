<template>
    <AppLayout :links="appDockLinks" :header-links="headerNavLinks" active-id="" page-variant="home"
        :footer-text="t('footer.copyright')">
        <PortfolioHero />
        <PortfolioAboutIntro />
        <PortfolioWhyList />
        <PortfolioShowcase />
        <PortfolioProof />
        <PortfolioHow />
        <PortfolioToolbox />
        <PortfolioJourneyPreview />
        <PortfolioContact />
    </AppLayout>
</template>

<script setup lang="ts">
const { t, locale } = useLocale();
const sectionIds = ['hello', 'about', 'works', 'proof', 'how', 'toolbox', 'journey', 'contact'] as const;

const appDockLinks = computed(() =>
    sectionIds.map((id) => ({
        href: `#${id}`,
        label: t(`nav.${id}`),
    })),
);

const headerNavLinks = useSubpageLinks();

usePortfolioSeo(() => ({
    title: t('meta.title'),
    description: t('meta.description'),
    ogTitle: t('meta.ogTitle'),
    ogDescription: t('meta.ogDescription'),
    path: '/',
    locale: locale.value,
    imageAlt: t('meta.ogTitle'),
    dateCreated: '2026-04-16T17:24:07+09:00',
    dateModified: '2026-09-15T00:00:00+09:00',
    relatedLinks: ['/projects/', '/personal/', '/journey/'],
    significantLinks: ['/projects/', '/journey/'],
}));
</script>
