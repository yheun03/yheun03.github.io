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
                    <div class="about-story__topline">
                        <p class="about-page__eyebrow">EUN / A PERSONAL FIELD GUIDE</p>
                        <span class="about-page__eyebrow">OFF THE CLOCK, ON MY OWN.</span>
                    </div>
                    <div class="about-story__intro">
                        <p class="about-story__edition">{{ t('aboutMe.introLabel') }}</p>
                        <h1 id="about-title" class="about-story__title">
                            {{ t('aboutMe.titleLine1') }}<br />
                            <span>{{ t('aboutMe.titleLine2') }}</span
                            ><span class="about-story__asterisk" aria-hidden="true">✳</span>
                        </h1>
                        <p class="about-story__lead">{{ t('aboutMe.intro') }}</p>
                        <BaseLink href="#about-mindset" class="about-page__text-link about-story__skip">
                            {{ t('aboutMe.skipStory') }} <span aria-hidden="true">↗</span>
                        </BaseLink>
                    </div>
                </div>
            </section>

            <section id="about-mindset" class="about-mindset" aria-labelledby="about-mindset-title" tabindex="-1">
                <div class="about-mindset__stage">
                    <div class="about-mindset__personality">
                        <p class="about-page__eyebrow">01 / THE WAY I AM</p>
                        <h2 id="about-mindset-title" class="about-mindset__letters" :aria-label="t('aboutMe.personalityHeading')">
                            <span v-for="letter in 'ENTJ'" :key="letter" class="about-mindset__letter" aria-hidden="true">{{ letter }}</span>
                        </h2>
                        <p class="about-mindset__personality-title">{{ t('aboutMe.personalityTitle') }}</p>
                        <p>{{ t('aboutMe.personalityDescription') }}</p>
                        <span class="about-mindset__annotation">A LITTLE LESS MAYBE. A LITTLE MORE LET'S GO.</span>
                    </div>
                    <div class="about-mindset__belief">
                        <h3 class="about-page__eyebrow">{{ t('aboutMe.beliefTitle') }}</h3>
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
                        <p class="about-page__eyebrow">02 / TWO LETTERS, ONE ME</p>
                        <h2 id="about-identity-title">
                            {{ t('aboutMe.identityTitle1') }}<br /><span>{{ t('aboutMe.identityTitle2') }}</span>
                        </h2>
                        <p>{{ t('aboutMe.identityIntro') }}</p>
                    </header>
                    <div class="about-identity__blueprint">
                        <span class="about-identity__figure-label" aria-hidden="true">FIG. 01 — YH / CONSTRUCTION</span>
                        <svg
                            class="about-identity__svg"
                            viewBox="0 0 600 420"
                            role="img"
                            focusable="false"
                            :aria-label="t('aboutMe.logoDescription')"
                        >
                            <defs>
                                <pattern id="about-logo-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M20 0H0V20" fill="none" stroke="var(--about-guide)" stroke-opacity=".15" stroke-width=".7" />
                                </pattern>
                            </defs>
                            <g class="about-identity__guides" fill="none" stroke="var(--about-guide)" stroke-width="1" aria-hidden="true">
                                <rect x="120" y="40" width="360" height="340" fill="url(#about-logo-grid)" stroke-opacity=".45" />
                                <path
                                    d="M60 78.5h480M60 339.5h480M151.65 15v390M450.8 15v390M60 210h480M300 15v390M225.8 60v300M306.8 60v300M369.8 60v300"
                                    stroke-dasharray="4 5"
                                />
                                <path d="m105 20 150 375M200 20l150 375M350 20 200 375M445 20 295 395" stroke-opacity=".55" />
                                <circle cx="300" cy="210" r="130" />
                                <circle cx="220" cy="120" r="40" />
                                <circle cx="380" cy="120" r="40" />
                                <circle cx="300" cy="270" r="70" />
                                <path d="M151.65 365H450.8m-299.15-5v10m299.15-10v10M475 78.5v261m-5-261h10m-10 261h10" />
                                <g fill="var(--about-guide)" stroke="none" font-size="10" font-family="monospace" letter-spacing="1">
                                    <text x="265" y="383">33.24 UNITS</text>
                                    <text x="488" y="215" transform="rotate(90 488 215)">29 UNITS</text>
                                    <text x="69" y="74">CAP HEIGHT</text>
                                    <text x="69" y="355">BASELINE</text>
                                    <text x="226" y="61">Y</text>
                                    <text x="372" y="61">H</text>
                                </g>
                            </g>
                            <!-- 실제 파비콘의 경로·색상·레이어 순서. -->
                            <g transform="translate(145 65) scale(9)">
                                <path
                                    class="about-identity__letter-h"
                                    d="M33.9771 30.5029H33.4771L25.4771 30.501H24.9771V20.4971L17.9771 20.499V30.5039H17.4771L9.47705 30.5029H8.97705V1.50293H9.47705L17.4771 1.50391H17.9771V11.502L24.9771 11.5V1.5H25.4771L33.4771 1.50293H33.9771V30.5029Z"
                                    fill="#8FB8FF"
                                    stroke="var(--about-ink)"
                                    stroke-width=".22"
                                />
                                <path
                                    class="about-identity__letter-y"
                                    d="M9.81592 1.5L9.94092 1.81445L13.4771 10.6543L17.0132 1.81445L17.1382 1.5H26.2153L25.9409 2.18555L17.9771 22.0947V30.5H8.97705V22.0947L1.01318 2.18555L0.73877 1.5H9.81592Z"
                                    fill="#EAF2FF"
                                    stroke="var(--about-ink)"
                                    stroke-width=".22"
                                />
                            </g>
                        </svg>
                        <span class="about-identity__figure-footer" aria-hidden="true">YOUNG HWAN / OVERLAPPING INITIALS</span>
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
                    <p class="about-identity__note">{{ t('aboutMe.constructionNote') }}</p>
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
                <p class="about-page__eyebrow" data-about-reveal>STILL ME. ALWAYS MOVING.</p>
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
                    <BaseLink href="/" class="about-page__text-link">{{ t('aboutMe.backHome') }} <span aria-hidden="true">↗</span></BaseLink>
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
                .to(select('.about-story__asterisk'), { rotation: 120, y: -20, duration: 1, ease: 'none' }, 0)
                .to(select('.about-story__edition, .about-story__lead'), { y: -20, duration: 1, ease: 'none' }, 0);

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
                    select('.about-mindset__personality-title, .about-mindset__personality > p:last-of-type, .about-mindset__annotation'),
                    { y: 28, opacity: 0.35, stagger: 0.16, duration: 0.7 },
                    0.45,
                )
                .from(select('.about-mindset__quote-mark'), { y: 24, rotation: -12, duration: 0.7 }, 0.95)
                .from(select('.about-mindset__belief blockquote p'), { x: 20, opacity: 0.35, duration: 0.9 }, 1.1)
                .from(select('.about-mindset__underline'), { backgroundSize: '0% 100%', duration: 1, ease: 'none' }, 1.5)
                .from(select('.about-mindset__belief cite, .about-mindset__belief-note'), { y: 22, opacity: 0.35, stagger: 0.16, duration: 0.7 }, 2.1)
                .to({}, { duration: 0.5 });

            // 본문은 스크롤 위치와 관계없이 스크린리더와 키보드 사용자에게 계속 노출한다.
            gsap.set(select('.about-identity__guides, .about-identity__figure-label, .about-identity__figure-footer'), {
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
                .to(select('.about-identity__figure-label, .about-identity__figure-footer'), { autoAlpha: 1, duration: 0.5 }, 1.7)
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
