<template>
    <AppLayout>
        <article class="about-page" aria-labelledby="about-page-title">
            <header class="page-heading" data-reveal="stagger">
                <h1 id="about-page-title">About me</h1>
                <p>{{ t('aboutMe.intro') }}</p>
            </header>
            <section class="about-page__intro" data-reveal="stagger">
                <h2>{{ t('aboutMe.titleLine1') }}<br />{{ t('aboutMe.titleLine2') }}</h2>
                <div>
                    <p>{{ t('aboutMe.roleAnswer') }}</p>
                    <BaseLink class="page-text-link" href="/projects">{{ t('aboutMe.viewWorks') }} <span aria-hidden="true">↗</span></BaseLink>
                </div>
            </section>
            <section class="about-page__mindset" data-reveal="stagger">
                <h2>{{ t('aboutMe.beliefTitle') }}</h2>
                <div>
                    <figure class="about-page__quote">
                        <blockquote>
                            <p>{{ t('aboutMe.beliefLine1') }} {{ t('aboutMe.beliefLine2') }}</p>
                        </blockquote>
                        <figcaption>{{ t('aboutMe.beliefSource') }}</figcaption>
                    </figure>
                    <p>{{ t('aboutMe.beliefDescription') }}</p>
                    <div class="about-page__personality">
                        <h3>{{ t('aboutMe.personalityTitle') }}</h3>
                        <p>{{ t('aboutMe.personalityDescription') }}</p>
                    </div>
                </div>
            </section>
            <section class="about-page__identity">
                <div class="about-page__mark">
                    <!-- Keep these paths in sync with assets/icons/logo-eun.svg. -->
                    <svg viewBox="0 0 240 98" role="img" :aria-label="t('aboutMe.logoDescription')">
                        <g fill="currentColor">
                            <path class="about-page__letter about-page__letter--e" fill-rule="evenodd"
                                d="M24 54H66V45C66 25 55 14 38 14C20 14 8 28 8 49C8 71 20 84 40 84C50 84 58 81 65 74L55 64C51 68 46 70 40 70C30 70 24 64 24 54ZM24 40C25 32 30 28 38 28C46 28 50 32 50 40Z" />
                            <path class="about-page__letter about-page__letter--u"
                                d="M134 82L118 82L118 74C113 81 106 84 98 84C84 84 78 75 78 60L78 16L94 16L94 56C94 65 98 70 105 70C113 70 118 64 118 55L118 16L134 16Z" />
                            <path class="about-page__letter about-page__letter--n"
                                d="M148 16L164 16L164 24C169 17 176 14 184 14C198 14 204 23 204 38L204 82L188 82L188 42C188 33 184 28 177 28C169 28 164 34 164 43L164 82L148 82Z" />
                        </g>
                        <circle class="about-page__dot" cx="224" cy="74" r="8" />
                    </svg>
                </div>
                <div>
                    <h2>{{ t('aboutMe.identityTitle1') }} {{ t('aboutMe.identityTitle2') }}</h2>
                    <p>{{ t('aboutMe.identityDescription') }}</p>
                    <ul class="about-page__identity-points">
                        <li>
                            <h3>{{ t('aboutMe.identityRhythmTitle') }}</h3>
                            <p>{{ t('aboutMe.identityRhythmDescription') }}</p>
                        </li>
                        <li>
                            <h3>{{ t('aboutMe.identityDotTitle') }}</h3>
                            <p>{{ t('aboutMe.identityDotDescription') }}</p>
                        </li>
                    </ul>
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
    image: '/assets/images/common/og/about.jpg',
    imageAlt: t('aboutMe.ogImageAlt'),
    imageWidth: 1200,
    imageHeight: 630,
    personDescription: t('aboutMe.intro'),
    dateModified: '2026-11-19',
    relatedLinks: ['/', '/journey/'],
    significantLinks: ['/projects/'],
    breadcrumbs: [
        { name: t('footer.homeLink'), path: '/' },
        { name: t('nav.aboutMe'), path: '/about' },
    ],
}));
</script>

<style lang="scss" src="~/assets/style/pages/_about.scss"></style>
