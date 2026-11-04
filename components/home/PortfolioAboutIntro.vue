<template>
    <HomeSection id="about" section-class="section--about-intro" title-id="section-about-title">
        <header class="about__intro" data-animate>
            <h2 id="section-about-title" class="about__display">
                <span class="about__display-line">{{ t('about.displayLine1') }}</span>
                <span class="about__display-line about__display-line--accent">{{ t('about.displayLine2') }}</span>
                <span class="about__display-line">{{ t('about.displayLine3') }}</span>
            </h2>

            <p class="about__lead">{{ t('about.tagline') }}</p>
            <BaseLink href="/about" class="about__personal-link">
                {{ t('aboutMe.homeLink') }}
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
            </BaseLink>
        </header>
    </HomeSection>
</template>

<script setup lang="ts">
const { t } = useLocale();
</script>
