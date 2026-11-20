<template>
    <footer id="contact" class="portfolio-footer" aria-labelledby="footer-contact-title">
        <h2 id="footer-contact-title" class="portfolio-footer__title">
            <a :href="`mailto:${contacts.email}`">Let’s talk<span aria-hidden="true">↗</span></a>
        </h2>
        <p class="portfolio-footer__description">
            {{ locale === 'ko' ? '채용이나 프로젝트 제안은 이메일로 보내주세요.' : 'For roles or project enquiries, please get in touch by email.' }}
        </p>
        <a class="portfolio-footer__email" :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
        <div class="portfolio-footer__links">
            <BaseLink :href="contacts.github" external>GitHub <span aria-hidden="true">↗</span></BaseLink>
            <BaseLink :href="contacts.resume" external>{{ locale === 'ko' ? '이력서' : 'Résumé' }} <span aria-hidden="true">↗</span></BaseLink>
        </div>
        <div class="portfolio-footer__bottom">
            <BaseLink class="portfolio-footer__brand" href="/" :aria-label="t('a11y.portfolioHome')">
                <img :src="resolveAppPath('/assets/icons/logo-eun.svg')" width="120" height="49" alt="" />
            </BaseLink>
            <p>{{ t('footer.copyright') }}</p>
            <nav :aria-label="t('footer.navLabel')">
                <NuxtLink to="/">{{ t('footer.homeLink') }}</NuxtLink>
                <NuxtLink to="/projects">{{ t('footer.careerLink') }}</NuxtLink>
                <NuxtLink to="/personal">{{ t('footer.personalLink') }}</NuxtLink>
            </nav>
            <a href="#main-content">{{ locale === 'ko' ? '맨 위로' : 'Back to top' }} <span aria-hidden="true">↑</span></a>
        </div>
    </footer>
</template>

<script setup lang="ts">
const { resolveAppPath } = useAppPath();
const { t, locale, content } = useLocale();
const contacts = computed(() => content.value.profile.contacts);
</script>
