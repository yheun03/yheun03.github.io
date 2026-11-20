import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'node:url';
import { joinURL } from 'ufo';

/** GitHub Pages 기본 경로 */
const rawBase = process.env.NUXT_APP_BASE_URL ?? '/';
const resolvedBaseURL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const imagesDir = fileURLToPath(new URL('./assets/images', import.meta.url));
const iconsDir = fileURLToPath(new URL('./assets/icons', import.meta.url));
const faviconHref = joinURL(resolvedBaseURL, 'assets/icons/favicon-eun.svg');
const faviconIcoHref = joinURL(resolvedBaseURL, 'assets/icons/favicon-eun.ico');
const appleTouchIconHref = joinURL(resolvedBaseURL, 'assets/icons/apple-touch-icon-eun.png');
const sitemapHref = joinURL(resolvedBaseURL, 'sitemap.xml');
const rssHref = joinURL(resolvedBaseURL, 'rss.xml');
const llmsHref = joinURL(resolvedBaseURL, 'llms.txt');
const googleSiteVerification = process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? '';
// 개발 서버는 수집하지 않고, 정적 배포 빌드는 기본으로 분석 태그를 포함한다.
const isAnalyticsEnabled = process.env.NODE_ENV === 'production' && process.env.ANALYTICS_ENABLED !== 'false';
const naverAnalyticsId = isAnalyticsEnabled ? (process.env.NUXT_PUBLIC_NAVER_ANALYTICS_ID?.trim() ?? '') : '';
const googleTagManagerId = isAnalyticsEnabled ? (process.env.NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID?.trim() ?? '') : '';

if (isAnalyticsEnabled) {
    if (!/^GTM-[A-Z0-9]+$/.test(googleTagManagerId)) throw new Error('배포에 필요한 NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID를 .env에 설정해 주세요.');
    if (!/^[a-f0-9]+$/i.test(naverAnalyticsId)) throw new Error('배포에 필요한 NUXT_PUBLIC_NAVER_ANALYTICS_ID를 .env에 설정해 주세요.');
}

export default defineNuxtConfig({
    compatibilityDate: '2026-05-02',
    // 개발 서버 실행 중 generate를 돌려도 개발용 .nuxt를 덮어쓰지 않는다.
    $production: {
        buildDir: '.nuxt-build',
    },
    ignore: ['.nuxt-build/**'],
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    experimental: {
        appManifest: false,
        defaults: { nuxtLink: { prefetchOn: { visibility: false, interaction: true } } },
    },

    runtimeConfig: {
        public: {
            naverSiteVerification: process.env.NUXT_PUBLIC_NAVER_SITE_VERIFICATION?.trim() ?? '',
            googleSiteVerification,
            naverAnalyticsId,
            googleTagManagerId,
        },
    },
    app: {
        baseURL: resolvedBaseURL,
        head: {
            htmlAttrs: { lang: 'ko' },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                { name: 'referrer', content: 'strict-origin-when-cross-origin' },
                { name: 'color-scheme', content: 'light' },
                { name: 'theme-color', content: '#f5f5f5' },
                { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
                ...(googleSiteVerification ? [{ name: 'google-site-verification', content: googleSiteVerification }] : []),
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', sizes: '16x16 32x32 48x48', href: faviconIcoHref },
                { rel: 'icon', type: 'image/svg+xml', sizes: 'any', href: faviconHref },
                { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIconHref },
                { rel: 'sitemap', type: 'application/xml', href: sitemapHref },
                { rel: 'alternate', type: 'application/rss+xml', title: '은영환 포트폴리오 RSS', href: rssHref },
                { rel: 'alternate', type: 'text/plain', title: 'AI-readable portfolio summary', href: llmsHref },
            ],
            script: [
                ...(googleTagManagerId
                    ? [
                          {
                              innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManagerId}');`,
                          },
                      ]
                    : []),
                ...(naverAnalyticsId
                    ? [
                          {
                              src: 'https://wcs.pstatic.net/wcslog.js',
                              tagPosition: 'bodyClose' as const,
                          },
                          {
                              innerHTML: `if (!wcs_add) var wcs_add = {}; wcs_add.wa = '${naverAnalyticsId}'; if (window.wcs) { wcs_do(); }`,
                              tagPosition: 'bodyClose' as const,
                          },
                      ]
                    : []),
            ],
            noscript: googleTagManagerId
                ? [
                      {
                          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                          tagPosition: 'bodyOpen',
                      },
                  ]
                : [],
        },
    },

    css: ['~/assets/style/main.scss'],

    routeRules: {
        '/projects/infra': { redirect: { to: '/projects/framework/', statusCode: 301 } },
        '/projects/infra/': { redirect: { to: '/projects/framework/', statusCode: 301 } },
        '/personal/jonsoft-framework-portfolio': { redirect: { to: '/personal/portfolio-2026/', statusCode: 301 } },
    },

    alias: {
        '@data': fileURLToPath(new URL('./data', import.meta.url)),
        '@i18n': fileURLToPath(new URL('./i18n', import.meta.url)),
    },

    imports: {
        dirs: ['~/composables', '~/composables/**'],
    },

    hooks: {
        'build:manifest': (manifest) => {
            // Load decorative motion only after the client checks reduced effects.
            for (const [id, chunk] of Object.entries(manifest)) {
                if (!id.includes('node_modules/gsap/')) continue;
                chunk.prefetch = false;
                chunk.preload = false;
            }
        },
    },

    components: [
        { path: '~/components/base', pathPrefix: false },
        { path: '~/components/work', pathPrefix: false },
        { path: '~/components/gallery', pathPrefix: false },
        { path: '~/components/home', pathPrefix: false },
        { path: '~/components/layout', pathPrefix: false },
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    loadPaths: ['assets/style'],
                    additionalData: '@use "abstracts/mixins" as *;',
                },
            },
        },
    },

    nitro: {
        preset: 'static',
        prerender: { ignore: ['/ver.2026'] },
        publicAssets: [
            { dir: imagesDir, baseURL: '/assets/images' },
            { dir: iconsDir, baseURL: '/assets/icons' },
        ],
    },
});
