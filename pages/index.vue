<template>
    <div class="studio">
        <a class="skip-link" href="#main-content">{{ copy('본문으로 이동', 'Skip to content') }}</a>
        <div class="studio__intro">
            <header class="studio-header">
                <a class="studio-header__brand" href="#hello">YOUNGHWAN<sup>©</sup><small>WEB PUBLISHER & UI DEVELOPER</small></a>
                <nav class="studio-header__nav" aria-label="Main navigation">
                    <a v-for="(link, index) in navigation" :key="link.href" :href="link.href"><sup>[0{{ index + 1 }}]</sup>{{ link.label }}</a>
                    <NuxtLink to="/journey"><sup>[05]</sup>JOURNEY</NuxtLink>
                    <button type="button" :disabled="switchingLocale" @click="switchLocale"><sup>[06]</sup>{{ locale === 'ko' ? 'ENGLISH ↗' : '한국어 ↗' }}</button>
                </nav>
                <a class="studio-pill" href="#contact"><span>↗</span>Let’s talk</a>
            </header>
            <main id="main-content" tabindex="-1">
                <section id="hello" class="studio-hero" aria-labelledby="hero-title">
                    <div class="studio-hero__heading"><p>[Portfolio]</p><h1 id="hero-title">YOUNGHWAN<span aria-hidden="true">YOUNGHWAN</span></h1><span class="studio-hero__edition">SELECTED WORK / 2026</span></div>
                    <div class="studio-hero__body">
                        <div class="studio-hero__aside">
                            <ul><li>Web Publishing</li><li>UI Development</li><li>Design Systems</li><li>Thoughtful Interaction</li></ul>
                            <div class="studio-hero__index"><span>SEOUL, KR</span><a href="#about">SCROLL TO EXPLORE ↓</a></div>
                            <p>{{ copy('기분 좋은 인터랙션과 탄탄한 구조를 함께 만드는 웹 퍼블리셔, 은영환입니다.', 'I’m Younghwan Eun, a web publisher building thoughtful interactions on solid foundations.') }}</p>
                        </div>
                        <NuxtLink to="/projects/framework" class="studio-hero__visual" :aria-label="copy('프레임워크 프로젝트 보기', 'Explore the framework project')">
                            <div class="studio-hero__visual-label"><span>DESIGN MEETS DEVELOPMENT</span><span>↗</span></div>
                            <div class="studio-device"><div class="studio-device__screen"><img :src="resolveAppPath('/assets/images/projects/framework/image-01.webp')" :alt="copy('조앤소프트 프레임워크 실제 화면', 'Jonsoft framework interface')" fetchpriority="high" /></div><div class="studio-device__base"></div></div>
                            <div class="studio-hero__visual-caption"><span>[ FEATURED EXPLORATION ]</span><span>Jonsoft Framework — UI System</span></div>
                        </NuxtLink>
                    </div>
                    <div class="studio-tools"><p>[ MY EVERYDAY TOOLKIT ]</p><ul><li v-for="tool in ['HTML5', 'SCSS', 'JavaScript', 'Vue.js', 'Nuxt', 'Figma']" :key="tool">{{ tool }}</li></ul></div>
                </section>
                <section id="about" class="studio-about studio-section">
                    <div class="studio-section__eyebrow">[ A LITTLE ABOUT ME ]<span>01 /</span></div>
                    <div class="studio-section__split"><div class="studio-about__monogram" aria-hidden="true">yh<span>↗</span></div><div><h2 class="studio-title">About.</h2><p class="studio-about__statement">{{ copy('보기 좋은 화면을 넘어, 사용하기 좋은 경험으로.', 'Beyond good-looking screens. Towards better experiences.') }} <span>{{ copy('디자인의 의도를 코드로 옮기고, 다음 작업까지 생각하는 구조를 만듭니다.', 'I translate design intent into code, with a structure built for what comes next.') }}</span></p><NuxtLink class="studio-text-link" to="/about">{{ copy('조금 더 알아보기', 'More about me') }} ↗</NuxtLink></div></div>
                    <div class="studio-stats"><div v-for="stat in profile.stats.slice(0, 3)" :key="stat.label"><strong>{{ stat.value }}<span>{{ stat.suffix }}</span></strong><div class="studio-stats__line">■</div><h3>{{ stat.label }}</h3><p>{{ stat.description }}</p></div></div>
                </section>
                <section id="works" class="studio-works studio-section">
                    <div class="studio-section__eyebrow">[ SELECTED WORKS ]<span>02 /</span></div>
                    <div class="studio-works__heading"><h2 class="studio-title">Projects.<sup>[{{ selectedWorks.length }}]</sup></h2><p>{{ copy('복잡한 업무 화면부터 브랜드의 첫인상까지. 실제 문제를 풀어 온 작업들입니다.', 'From complex business interfaces to a brand’s first impression. Selected work solving real problems.') }}</p></div>
                    <div class="studio-works__grid"><NuxtLink v-for="(work, index) in selectedWorks" :key="work.id" :to="`/projects/${work.id}`" class="studio-work"><div class="studio-work__image" :class="`studio-work__image--${index % 3}`"><span class="studio-work__category">{{ work.tech.slice(0, 2).join(' / ') }}</span><img :src="resolveAppPath(work.thumbnail || work.captures[0] || '')" :alt="work.title" loading="lazy" width="1200" height="800" /><span class="studio-work__arrow" aria-hidden="true">↗</span></div><div class="studio-work__caption"><h3>{{ work.title }}</h3><span>{{ work.period }}</span></div></NuxtLink></div>
                    <div class="studio-works__more"><NuxtLink to="/personal">{{ copy('개인 프로젝트', 'Personal projects') }} ↗</NuxtLink><NuxtLink to="/projects">{{ copy('전체 프로젝트 보기', 'View all projects') }} <span>↗</span></NuxtLink></div>
                </section>
                <section id="approach" class="studio-approach studio-section">
                    <div class="studio-section__eyebrow">[ WHAT I BRING ]<span>03 /</span></div>
                    <div class="studio-section__split"><div class="studio-approach__intro"><p>{{ copy('디테일은 섬세하게. 구조는 단단하게.', 'Care in the details. Strength in the structure.') }}</p><span class="studio-approach__symbol" aria-hidden="true">✳</span><span>DESIGN → CODE → EXPERIENCE</span></div><div><h2 class="studio-title">Approach.</h2><div class="studio-approach__list"><details v-for="(item, index) in approaches" :key="item.title" :open="index === 0"><summary><span>0{{ index + 1 }}</span>{{ item.title }}<i aria-hidden="true">↗</i></summary><p>{{ item.description }}</p></details></div></div></div>
                </section>
                <section class="studio-principles studio-section"><div class="studio-section__eyebrow">[ HOW I WORK ]<span>04 /</span></div><h2>{{ copy('작은 디테일이 모여,', 'Small details.') }}<br /><span>{{ copy('좋은 경험이 됩니다.', 'Meaningful experiences.') }}</span></h2><div class="studio-principles__grid"><article v-for="(item, index) in principles" :key="item.title"><span class="studio-principles__number">[ 0{{ index + 1 }} ]</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p></article></div></section>
                <section id="contact" class="studio-contact studio-section"><div class="studio-section__eyebrow">[ HAVE SOMETHING IN MIND? ]<span>05 /</span></div><p>{{ copy('함께 만들 다음 화면이 궁금합니다.', 'Let’s talk about what we can create together.') }}</p><a class="studio-contact__title" :href="`mailto:${profile.contacts.email}`">Let’s talk.<span>↗</span></a><div class="studio-contact__links"><a :href="`mailto:${profile.contacts.email}`">{{ profile.contacts.email }} ↗</a><div><BaseLink :href="profile.contacts.github" external>GITHUB ↗</BaseLink><BaseLink :href="profile.contacts.resume" external>RÉSUMÉ ↗</BaseLink></div></div></section>
            </main>
        </div>
        <footer class="studio-footer"><a href="#hello">YOUNGHWAN©</a><span>© {{ new Date().getFullYear() }} EUN YOUNGHWAN</span><a href="#hello">BACK TO TOP ↑</a></footer>
    </div>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';
const { t, locale, content, toggleLocale } = useLocale();
const { resolveAppPath } = useAppPath();
const copy = (ko: string, en: string) => locale.value === 'ko' ? ko : en;
const profile = computed(() => content.value.profile);
const switchingLocale = ref(false);
async function switchLocale() {
    switchingLocale.value = true;
    try { await toggleLocale(); } finally { switchingLocale.value = false; }
}
const navigation = [{ href: '#hello', label: 'HOME' }, { href: '#works', label: 'WORKS' }, { href: '#about', label: 'ABOUT' }, { href: '#approach', label: 'APPROACH' }];
const selectedWorks = computed(() => ['framework', 'orchem-mes', 'hanjinkal', 'samhwa-eco-dashboard', 'oms', 'company-renewal'].map(id => (content.value.works.career as WorkItem[]).find(work => work.id === id)).filter((work): work is WorkItem => Boolean(work)));
const approaches = computed(() => [
    { title: 'Web Publishing', description: copy('HTML과 SCSS로 디자인의 의도를 정확하게 구현합니다. 화면 크기가 달라져도 자연스럽게 이어지는 레이아웃을 만듭니다.', 'Precise HTML and SCSS implementation, with responsive layouts that preserve the intent of the design.') },
    { title: 'UI Development', description: copy('Vue 기반 컴포넌트로 상태와 인터랙션을 연결합니다. 복잡한 업무 흐름을 이해하기 쉬운 화면으로 풀어냅니다.', 'Vue components connect state and interaction, turning complex workflows into clear interfaces.') },
    { title: 'Design Systems', description: copy('디자인 토큰과 공통 컴포넌트로 반복 작업을 줄이고, 여러 화면에 일관된 기준을 적용합니다.', 'Design tokens and shared components reduce repetitive work and bring consistency across screens.') },
    { title: 'Documentation & Collaboration', description: copy('사용 방법과 작업 기준을 문서로 남깁니다. 동료가 이어서 작업하기 편한 코드를 고민합니다.', 'Practical documentation and clear conventions help the next person build with confidence.') },
]);
const principles = computed(() => [
    { title: copy('의도를 이해하는 구현', 'Intent before implementation'), description: copy('무엇을 만드는지에 앞서, 왜 필요한지부터 이해합니다. 사용자의 다음 행동이 분명한 화면을 지향합니다.', 'Understand why before deciding how. Make the next action clear to the people using the interface.') },
    { title: copy('함께 쓰기 좋은 구조', 'Built to be shared'), description: copy('재사용 가능한 컴포넌트와 일관된 스타일로, 혼자만 이해하는 코드가 아닌 함께 발전시키는 기반을 만듭니다.', 'Reusable components and consistent styles create a foundation that the whole team can improve.') },
    { title: copy('운영까지 이어지는 책임', 'Care beyond launch'), description: copy('구현으로 끝내지 않습니다. 실제 사용 중 만나는 문제를 살피고 화면과 구조를 꾸준히 다듬습니다.', 'The work continues after launch: observing real issues and refining both the interface and its foundations.') },
]);
usePortfolioSeo(() => ({ title: t('meta.title'), description: t('meta.description'), ogTitle: t('meta.ogTitle'), ogDescription: t('meta.ogDescription'), path: '/', locale: locale.value, imageAlt: t('meta.ogTitle'), dateCreated: '2026-04-16T17:24:07+09:00', dateModified: '2026-11-17T00:00:00+09:00', relatedLinks: ['/about/', '/projects/', '/personal/', '/journey/'], significantLinks: ['/projects/', '/journey/'] }));
</script>

<style lang="scss" src="~/assets/style/pages/_studio.scss" scoped></style>
