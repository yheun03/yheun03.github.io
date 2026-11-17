<template>
    <div class="silver-shell">
        <a class="skip-link" href="#main-content" @click="focusMainContent">{{ t('a11y.skipToContent') }}</a>
        <StudioHeader />
        <main id="main-content" ref="pageRoot" class="portfolio-page" :class="pageVariant && `portfolio-page--${pageVariant}`" tabindex="-1">
            <slot />
        </main>
        <AppFooter :text="footerText" />
    </div>
</template>

<script setup lang="ts">
const { t } = useLocale();
const pageRoot = ref<HTMLElement | null>(null);

usePageMotion(pageRoot);

withDefaults(
    defineProps<{
        /** AppDock용 섹션 앵커(홈). 서브페이지에서는 헤더와 동일하게 쓰면 됨 */
        links: { href: string; label: string }[];
        activeId: string;
        footerText: string;
        /** GNB·모바일 메뉴 전용 링크. 없으면 `links`와 동일 */
        headerLinks?: { href: string; label: string }[];
        /** 서브페이지에서 로고 링크 — 기본 홈 앵커 */
        brandHref?: string;
        /** 서브페이지 네비 활성 경로 (예: `/projects`) */
        activePath?: string;
        showAppDock?: boolean;
        /** 페이지별 색상·여백 개성 (home·journey·archive-career·archive-personal) */
        pageVariant?: string;
    }>(),
    {
        brandHref: '#hello',
        showAppDock: true,
    },
);

function focusMainContent(event: MouseEvent) {
    if (!import.meta.client) return;
    const main = document.getElementById('main-content');
    if (!main) return;
    event.preventDefault();
    main.focus({ preventScroll: false });
}
</script>

<style lang="scss" src="~/assets/style/pages/_silver-shell.scss"></style>

<style lang="scss" src="~/assets/style/pages/_silver-pages.scss"></style>
