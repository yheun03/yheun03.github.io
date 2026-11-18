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
            <BaseLink :href="contacts.github" external>GitHub ↗</BaseLink>
            <BaseLink :href="contacts.resume" external>{{ locale === 'ko' ? '이력서' : 'Résumé' }} ↗</BaseLink>
        </div>
        <div class="portfolio-footer__bottom">
            <p>{{ text || t('footer.copyright') }}</p>
            <nav :aria-label="t('footer.navLabel')">
                <NuxtLink to="/">{{ t('footer.homeLink') }}</NuxtLink>
                <NuxtLink to="/projects">{{ t('footer.careerLink') }}</NuxtLink>
                <NuxtLink to="/personal">{{ t('footer.personalLink') }}</NuxtLink>
            </nav>
            <a href="#main-content">{{ locale === 'ko' ? '맨 위로 ↑' : 'Back to top ↑' }}</a>
        </div>
    </footer>
</template>

<script setup lang="ts">
defineProps<{ text?: string }>();
const { t, locale, content } = useLocale();
const contacts = computed(() => content.value.profile.contacts);
</script>

<style scoped lang="scss">
.portfolio-footer {
    padding: clamp(60px, 7vw, 120px) 5% 28px;
    border-top: 1px solid #23355426;
    background: var(--silver-paper);
    color: #222a35;
    font-family: Arial, 'Pretendard', sans-serif;
    word-break: keep-all;
    scroll-margin-top: 100px;
    a {
        text-decoration: none;
    }
    a:focus-visible {
        outline: 2px solid #2354d8;
        outline-offset: 5px;
    }
    &__title {
        margin: 0;
        font-family: inherit;
        font-weight: 400;
        font-size: clamp(72px, 13vw, 200px);
        line-height: 1;
        letter-spacing: -0.075em;
        a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            color: var(--silver-orange);
        }
        span {
            font-size: 0.65em;
            transition: transform 0.3s;
        }
        a:hover span {
            transform: translate(6px, -6px);
        }
    }
    &__description {
        margin: 36px 0 40px;
        color: #566273;
        font-size: 16px;
        line-height: 1.7;
    }
    &__email {
        display: block;
        color: #222a35;
        font-size: clamp(22px, 2.4vw, 36px);
        line-height: 1.3;
        letter-spacing: -0.04em;
        overflow-wrap: anywhere;
        padding-bottom: 28px;
        border-bottom: 1px solid #b9c2cf;
    }
    &__links {
        display: flex;
        gap: 30px;
        margin-top: 25px;
        font-size: 14px;
    }
    &__bottom {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-top: 64px;
        padding-top: 24px;
        border-top: 1px solid #23355426;
        font-size: 12px;
        color: #566273;
        p {
            margin: 0;
        }
        nav {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
        }
        a {
            color: #222a35;
        }
    }
}
@media (max-width: 640px) {
    .portfolio-footer {
        scroll-margin-top: 140px;
        &__title {
            font-size: 17vw;
        }
        &__description {
            font-size: 14px;
            margin: 24px 0 30px;
        }
        &__email {
            font-size: 22px;
            padding-bottom: 24px;
        }
        &__bottom {
            margin-top: 44px;
        }
    }
}
@media (prefers-reduced-motion: reduce) {
    .portfolio-footer__title span {
        transition: none;
    }
}
</style>
