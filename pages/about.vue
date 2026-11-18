<template>
    <AppLayout>
        <article class="about-page">
            <header class="page-heading">
                <h1>About me</h1>
                <p>{{ t('aboutMe.intro') }}</p>
            </header>
            <section class="about-page__intro">
                <h2>{{ t('aboutMe.titleLine1') }}<br />{{ t('aboutMe.titleLine2') }}</h2>
                <div>
                    <p>{{ t('aboutMe.roleAnswer') }}</p>
                    <BaseLink class="page-text-link" href="/projects">{{ t('aboutMe.viewWorks') }} <span aria-hidden="true">↗</span></BaseLink>
                </div>
            </section>
            <section class="about-page__mindset">
                <h2>{{ t('aboutMe.beliefTitle') }}</h2>
                <div>
                    <blockquote>
                        <p>{{ t('aboutMe.beliefLine1') }} {{ t('aboutMe.beliefLine2') }}</p>
                        <cite>{{ t('aboutMe.beliefSource') }}</cite>
                    </blockquote>
                    <p>{{ t('aboutMe.beliefDescription') }}</p>
                    <div class="about-page__personality">
                        <h3>{{ t('aboutMe.personalityTitle') }}</h3>
                        <p>{{ t('aboutMe.personalityDescription') }}</p>
                    </div>
                </div>
            </section>
            <section class="about-page__identity">
                <div class="about-page__mark">
                    <svg viewBox="0 0 36 32" role="img" :aria-label="t('aboutMe.logoDescription')">
                        <g stroke="#000" stroke-width="1" stroke-linejoin="miter">
                            <path d="M10 2H18V12H26V2H34V30H26V20H18V30H10Z" fill="#8FB8FF" />
                            <path d="M2 2H10L14 12L18 2H26L18 22V30H10V22Z" fill="#EAF2FF" />
                        </g>
                    </svg>
                </div>
                <div>
                    <h2>{{ t('aboutMe.identityTitle1') }} {{ t('aboutMe.identityTitle2') }}</h2>
                    <p>{{ t('aboutMe.identityDescription') }}</p>
                </div>
            </section>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
const { t, locale } = useLocale();
usePortfolioSeo(() => ({
    title: t('aboutMe.metaTitle'),
    description: t('aboutMe.metaDescription'),
    path: '/about',
    locale: locale.value,
    schemaType: 'ProfilePage',
    ogTitle: t('aboutMe.ogTitle'),
    ogDescription: t('aboutMe.metaDescription'),
    image: '/assets/images/common/og/about-yh-20261028.png',
    imageAlt: t('aboutMe.ogImageAlt'),
    imageWidth: 1200,
    imageHeight: 630,
    personDescription: t('aboutMe.intro'),
    dateModified: '2026-11-18',
    relatedLinks: ['/', '/journey/'],
    significantLinks: ['/projects/'],
    breadcrumbs: [
        { name: t('footer.homeLink'), path: '/' },
        { name: t('nav.aboutMe'), path: '/about' },
    ],
}));
</script>

<style lang="scss" src="~/assets/style/pages/_about.scss"></style>
