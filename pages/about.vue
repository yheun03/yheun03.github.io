<template>
    <AppLayout
        :links="layoutLinks"
        active-id=""
        brand-href="/"
        active-path="/about"
        page-variant="about"
        :show-app-dock="false"
        :footer-text="t('footer.copyright')"
    >
        <div ref="pageRef" class="about-page">
            <section id="about-intro" class="about-story" aria-labelledby="about-title">
                <div class="about-story__stage">
                    <div class="about-story__intro">
                        <h1 id="about-title" class="about-story__title">
                            {{ t('aboutMe.titleLine1') }}<br />
                            <span>{{ t('aboutMe.titleLine2') }}</span>
                        </h1>
                        <p class="about-story__lead">{{ t('aboutMe.intro') }}</p>
                        <BaseLink href="#about-mindset" class="about-page__text-link about-story__skip">
                            {{ t('aboutMe.skipStory') }}
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
                    </div>
                </div>
            </section>

            <section id="about-mindset" class="about-mindset" aria-labelledby="about-mindset-title" tabindex="-1">
                <div class="about-mindset__stage">
                    <div class="about-mindset__personality">
                        <h2 id="about-mindset-title" class="about-mindset__letters" :aria-label="t('aboutMe.personalityHeading')">
                            <span v-for="letter in 'ENTJ'" :key="letter" class="about-mindset__letter" aria-hidden="true">{{ letter }}</span>
                        </h2>
                        <p class="about-mindset__personality-title">{{ t('aboutMe.personalityTitle') }}</p>
                        <p>{{ t('aboutMe.personalityDescription') }}</p>
                    </div>
                    <div class="about-mindset__belief">
                        <h3 class="about-mindset__belief-title">{{ t('aboutMe.beliefTitle') }}</h3>
                        <blockquote>
                            <span class="about-mindset__quote-mark" aria-hidden="true">“</span>
                            <p>
                                {{ t('aboutMe.beliefLine1') }}<br /><span class="about-mindset__underline">{{ t('aboutMe.beliefLine2') }}</span>
                            </p>
                            <cite>{{ t('aboutMe.beliefSource') }}</cite>
                        </blockquote>
                        <p class="about-mindset__belief-note">{{ t('aboutMe.beliefDescription') }}</p>
                    </div>
                </div>
            </section>

            <section id="about-identity" class="about-identity" aria-labelledby="about-identity-title">
                <div class="about-identity__stage">
                    <header class="about-identity__heading">
                        <h2 id="about-identity-title">
                            {{ t('aboutMe.identityTitle1') }}<br /><span>{{ t('aboutMe.identityTitle2') }}</span>
                        </h2>
                        <p>{{ t('aboutMe.identityIntro') }}</p>
                    </header>
                    <div class="about-identity__blueprint">
                        <svg
                            class="about-identity__svg"
                            viewBox="0 0 600 420"
                            role="img"
                            focusable="false"
                            :aria-label="t('aboutMe.logoDescription')"
                        >
                            <defs>
                                <pattern id="about-logo-grid" x="138" y="66" width="9" height="9" patternUnits="userSpaceOnUse">
                                    <path d="M9 0H0V9" fill="none" stroke="var(--about-guide)" stroke-opacity=".15" stroke-width="1" />
                                </pattern>
                            </defs>
                            <!-- 최종 아이콘의 정수 좌표와 1단위 선 두께. 치수선은 경로 중심을 기준으로 한다. -->
                            <g
                                transform="translate(138 66) scale(9)"
                                stroke="#000000"
                                stroke-width="1"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                            >
                                <path class="about-identity__letter-h" d="M10 2H18V12H26V2H34V30H26V20H18V30H10Z" fill="#8FB8FF" />
                                <path class="about-identity__letter-y" d="M2 2H10L14 12L18 2H26L18 22V30H10V22Z" fill="#EAF2FF" />
                            </g>
                            <g class="about-identity__guides" fill="none" stroke="var(--about-guide)" stroke-width="1" aria-hidden="true">
                                <rect x="138" y="66" width="324" height="288" fill="url(#about-logo-grid)" stroke-opacity=".45" />
                                <path
                                    d="M120 84H480M120 174H480M120 246H480M120 336H480M228 58V362M300 58V362M372 58V362M444 58V362"
                                    stroke-dasharray="4 5"
                                />
                                <path d="M138 375H462M138 370V380M462 370V380M492 66V354M487 66H497M487 354H497" />
                                <path d="M228 50H300M228 45V55M300 45V55M372 50H444M372 45V55M444 45V55" />
                                <path d="M108 84V336M103 84H113M103 174H113M103 246H113M103 336H113" />
                                <g fill="var(--about-guide)" stroke="none" font-size="10" font-family="monospace" letter-spacing="1">
                                    <text x="300" y="397" text-anchor="middle">36 UNITS</text>
                                    <text x="510" y="210" text-anchor="middle" transform="rotate(90 510 210)">32 UNITS</text>
                                    <text x="264" y="40" text-anchor="middle">8</text>
                                    <text x="408" y="40" text-anchor="middle">8</text>
                                    <text x="95" y="132" text-anchor="end">10</text>
                                    <text x="95" y="213" text-anchor="end">8</text>
                                    <text x="95" y="294" text-anchor="end">10</text>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="about-identity__details">
                        <div class="about-identity__formula" aria-hidden="true">
                            <span>Y</span><span>+</span><span>H</span><span>=</span><strong>{{ t('aboutMe.identityMe') }}</strong>
                        </div>
                        <p>{{ t('aboutMe.identityDescription') }}</p>
                        <div class="about-identity__palette" role="group" :aria-label="t('aboutMe.paletteLabel')">
                            <div>
                                <i style="--swatch: #eaf2ff" aria-hidden="true" /><span>PALE BLUE<small>#EAF2FF</small></span>
                            </div>
                            <div>
                                <i style="--swatch: #8fb8ff" aria-hidden="true" /><span>SKY BLUE<small>#8FB8FF</small></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="answers" class="about-answers" aria-labelledby="about-answers-title">
                <h2 id="about-answers-title">{{ t('aboutMe.answersTitle') }}</h2>
                <dl class="about-answers__list">
                    <div v-for="(question, index) in questions" :key="index" class="about-answers__item">
                        <dt>{{ question.name }}</dt>
                        <dd>{{ question.acceptedAnswer }}</dd>
                    </div>
                </dl>
            </section>

            <section class="about-outro" aria-labelledby="about-outro-title">
                <h2 id="about-outro-title">
                    <span class="about-outro__line"
                        ><span class="about-outro__line-text">{{ t('aboutMe.outroLine1') }}</span></span
                    >
                    <span class="about-outro__line"
                        ><span class="about-outro__line-text">{{ t('aboutMe.outroLine2') }}</span></span
                    >
                </h2>
                <p data-about-reveal>{{ t('aboutMe.outroDescription') }}</p>
                <div class="about-outro__links" data-about-reveal>
                    <BaseButton href="/projects" :label="t('aboutMe.viewWorks')" />
                    <BaseLink href="/" class="about-page__text-link"
                        >{{ t('aboutMe.backHome') }}
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
                            <path d="M7 17 17 7" /></svg
                    ></BaseLink>
                </div>
                <span class="about-outro__signature" aria-hidden="true">Eun.</span>
            </section>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
const { t, locale } = useLocale();
const layoutLinks = useSubpageLinks();
const pageRef = ref<HTMLElement | null>(null);
const questions = computed(() =>
    ['role', 'personality', 'logo'].map((key) => ({
        name: t(`aboutMe.${key}Question`),
        acceptedAnswer: t(`aboutMe.${key}Answer`),
    })),
);
let motion: { revert: () => void } | undefined;
let refreshMotion: (() => void) | undefined;
let disposed = false;

watch(locale, async () => {
    await nextTick();
    if (!disposed) refreshMotion?.();
});

onMounted(async () => {
    if (useReducedEffects()) return;

    // 이 페이지에서만 GSAP을 불러온다. 페이지 이동 시 모든 트리거와 인라인 스타일을 복원한다.
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
    if (disposed || !pageRef.value) return;
    gsap.registerPlugin(ScrollTrigger);
    refreshMotion = () => ScrollTrigger.refresh();
    const page = pageRef.value;
    const media = gsap.matchMedia();
    motion = media;

    media.add(
        {
            animate: '(prefers-reduced-motion: no-preference) and (min-height: 600px)',
            pinMindset: '(min-width: 1024px) and (min-height: 740px)',
        },
        (context) => {
            const { animate, pinMindset } = context.conditions!;
            if (!animate) return;
            const select = gsap.utils.selector(page);
            select('[data-about-reveal]').forEach((element: HTMLElement) => {
                gsap.from(element, {
                    y: 45,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: element, start: 'top 90%', toggleActions: 'play none none reverse' },
                });
            });
            const story = gsap.timeline({
                scrollTrigger: { trigger: select('.about-story')[0], start: 'top top+=66', end: 'bottom top+=66', scrub: 0.7 },
            });
            story
                .to(select('.about-story__title'), { yPercent: -12, duration: 1, ease: 'none' }, 0)
                .to(select('.about-story__lead'), { y: -20, duration: 1, ease: 'none' }, 0);

            // 넓고 충분히 높은 화면에서만 고정하고, 작은 화면은 같은 순서로 자연스럽게 읽게 한다.
            const mindset = gsap.timeline({
                scrollTrigger: {
                    trigger: select('.about-mindset')[0],
                    pin: pinMindset ? select('.about-mindset__stage')[0] : false,
                    start: pinMindset ? 'top top+=66' : 'top 80%',
                    end: pinMindset ? () => `+=${window.innerHeight * 1.15}` : 'bottom 65%',
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });
            mindset
                .from(select('.about-mindset__letter'), { yPercent: 110, rotation: 8, stagger: 0.14, duration: 1.1, ease: 'power3.out' }, 0)
                .from(
                    select('.about-mindset__personality-title, .about-mindset__personality > p:last-of-type'),
                    { y: 28, clipPath: 'inset(0 0 100% 0)', stagger: 0.16, duration: 0.7 },
                    0.45,
                )
                .from(select('.about-mindset__belief'), { y: 24, clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'power2.out' }, 0.95)
                .to({}, { duration: 0.5 });

            // 본문은 스크롤 위치와 관계없이 스크린리더와 키보드 사용자에게 계속 노출한다.
            gsap.set(select('.about-identity__guides'), {
                autoAlpha: 0,
            });
            const identity = gsap.timeline({
                scrollTrigger: {
                    trigger: select('.about-identity')[0],
                    pin: select('.about-identity__stage')[0],
                    start: 'top top+=66',
                    end: () => `+=${window.innerHeight * 1.8}`,
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });
            identity
                .from(select('.about-identity__letter-y'), { x: -42, autoAlpha: 0, duration: 1.5, ease: 'power2.inOut' }, 0)
                .from(select('.about-identity__letter-h'), { x: 42, autoAlpha: 0, duration: 1.5, ease: 'power2.inOut' }, 0)
                .to(select('.about-identity__guides'), { autoAlpha: 1, duration: 0.8 }, 1.5)
                .from(select('.about-identity__details'), { y: 16, duration: 0.7 }, 1.8)
                .to({}, { duration: 0.7 });

            select('.about-answers__item').forEach((element: HTMLElement) => {
                gsap.timeline({
                    scrollTrigger: { trigger: element, start: 'top 90%', end: 'top 55%', scrub: 0.6 },
                })
                    .from(element, { '--about-rule-scale': 0, duration: 0.8, ease: 'none' }, 0)
                    .from(element.querySelector('dt'), { y: 18, opacity: 0.4, duration: 0.65 }, 0.1)
                    .from(element.querySelector('dd'), { y: 24, opacity: 0.35, duration: 0.8 }, 0.25);
            });

            const outro = gsap.timeline({
                scrollTrigger: { trigger: select('.about-outro')[0], start: 'top 85%', end: 'center 65%', scrub: 0.7 },
            });
            outro
                .from(select('.about-outro__line-text'), { yPercent: 110, rotation: 2, stagger: 0.16, duration: 1, ease: 'power3.out' }, 0)
                .from(select('.about-outro__signature'), { yPercent: 25, rotation: 3, duration: 1.5, ease: 'none' }, 0);
        },
        page,
    );
    await document.fonts.ready;
    if (!disposed) ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
    disposed = true;
    motion?.revert();
});

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
    questions: questions.value,
    dateModified: '2026-10-28',
    relatedLinks: ['/', '/journey/'],
    significantLinks: ['/projects/'],
    breadcrumbs: [
        { name: t('footer.homeLink'), path: '/' },
        { name: t('nav.aboutMe'), path: '/about' },
    ],
}));
</script>
