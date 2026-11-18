<template>
    <div class="studio">
        <a class="skip-link" href="#main-content">{{ copy('본문으로 이동', 'Skip to content') }}</a>
        <StudioHeader home />
        <main id="main-content" tabindex="-1">
            <section id="hello" class="studio-hero" aria-labelledby="hero-title">
                <div class="studio-hero__heading">
                    <h1 id="hero-title">YOUNGHWAN <span>EUN</span></h1>
                </div>
                <div class="studio-hero__body">
                    <NuxtLink to="/projects/framework" class="studio-hero__visual" :aria-label="copy('조앤소프트 프레임워크 프로젝트 보기', 'Explore the Jonsoft framework project')">
                        <div class="studio-mockup studio-mockup--laptop">
                            <div class="studio-mockup__screen">
                                <img :src="resolveAppPath('/assets/images/projects/framework/image-01.webp')" :alt="copy('조앤소프트 프레임워크 실제 화면', 'Jonsoft framework interface')" fetchpriority="high" />
                            </div>
                            <div class="studio-mockup__base" aria-hidden="true"></div>
                        </div>
                        <span class="studio-hero__visual-arrow" aria-hidden="true">↗</span>
                    </NuxtLink>
                    <div class="studio-hero__intro">
                        <p v-if="locale === 'ko'"><strong>디자인을 웹 화면으로 구현하는</strong> <span class="studio__keep-together">웹 퍼블리셔</span> 은영환입니다.</p>
                        <p v-else>I’m Younghwan Eun, a <span class="studio__keep-together">web publisher</span> who <strong>turns designs into working interfaces.</strong></p>
                        <p>{{ copy('HTML, SCSS, JavaScript와 Vue로 기업 홈페이지와 업무 시스템의 UI를 구현합니다.', 'I develop interfaces for corporate websites and business applications with HTML, SCSS, JavaScript and Vue.') }}</p>
                        <a class="studio-text-link" href="#works">{{ copy('작업 보기', 'Explore my work') }} <span aria-hidden="true">↗</span></a>
                    </div>
                </div>
            </section>
            <section class="studio-companies" :aria-label="copy('참여 프로젝트 및 협업 기업', 'Project clients and collaborators')">
                <h2 class="studio-companies__title">{{ copy('참여 프로젝트 및 협업 기업', 'Project clients and collaborators') }}</h2>
                <div v-for="group in companyGroups" :key="group.id" class="studio-companies__group">
                    <h3>{{ group.title }}</h3>
                    <ul class="studio-companies__logos">
                        <li v-for="company in group.companies" :key="company.id">
                            <NuxtLink :to="`/projects/${company.project}`" :aria-label="`${company.name} ${copy('프로젝트 보기', 'project')}`">
                                <span class="studio-companies__logo-frame">
                                    <img :src="resolveAppPath(`/assets/images/companies/${company.file}`)" :alt="company.name" :class="`studio-companies__logo--${company.id}`" loading="lazy" />
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </section>
            <section id="about" class="studio-about studio-section">
                <h2 class="studio-title">About</h2>
                <div class="studio-about__content">
                    <p v-if="locale === 'ko'" class="studio-about__statement"><strong>기업 홈페이지부터 제조와 물류 시스템까지</strong> 구현하고 운영해 왔습니다.</p>
                    <p v-else class="studio-about__statement">I build and maintain <strong>corporate websites, manufacturing systems and logistics interfaces.</strong></p>
                    <p v-if="locale === 'ko'">화면 퍼블리싱을 시작으로 <strong>Vue 컴포넌트와 사내 프레임워크 개발</strong>까지 업무를 넓혔습니다. 반복되는 UI를 공통화하고, 팀에서 사용할 수 있도록 작업 기준과 사용 방법을 문서로 정리합니다.</p>
                    <p v-else>My work has expanded from web publishing to <strong>Vue components and an internal framework.</strong> I turn recurring UI into shared components and document conventions and usage for the team.</p>
                    <NuxtLink class="studio-text-link" to="/about">{{ copy('경력 자세히 보기', 'More about my experience') }} ↗</NuxtLink>
                    <div class="studio-stats">
                        <div v-for="stat in profile.stats.slice(0, 2)" :key="stat.label">
                            <strong>{{ stat.value }}<span>{{ stat.suffix }}</span></strong>
                            <h3>{{ stat.label }}</h3>
                        </div>
                    </div>
                </div>
            </section>
            <section id="works" class="studio-works studio-section">
                <div class="studio-works__heading">
                    <h2 class="studio-title">Selected work</h2>
                    <p>{{ copy('웹사이트 구축, 업무 화면 개발, 공통 UI 작업을 모았습니다.', 'Websites, business applications and shared UI components.') }}</p>
                </div>
                <div class="studio-works__grid">
                    <NuxtLink v-for="(work, index) in selectedWorks" :key="work.id" :to="`/projects/${work.id}`" class="studio-work">
                        <div class="studio-work__image" :class="[`studio-work__image--${index % 3}`, { 'studio-work__image--paired': projectDevices[work.id] }]">
                            <div class="studio-mockup studio-mockup--laptop">
                                <div class="studio-mockup__screen">
                                    <img :src="resolveAppPath(work.captures[0] || '')" :alt="`${work.title} ${copy('PC 화면', 'desktop interface')}`" loading="lazy" />
                                </div>
                                <div class="studio-mockup__base" aria-hidden="true"></div>
                            </div>
                            <div v-if="projectDevices[work.id]" class="studio-mockup" :class="`studio-mockup--${projectDevices[work.id].type}`">
                                <div class="studio-mockup__screen">
                                    <img :src="resolveAppPath(projectDevices[work.id].capture)" :alt="`${work.title} ${projectDevices[work.id].type === 'phone' ? copy('모바일 화면', 'mobile interface') : copy('태블릿 화면', 'tablet interface')}`" loading="lazy" />
                                </div>
                            </div>
                        </div>
                        <div class="studio-work__caption"><h3>{{ work.title }}</h3><span aria-hidden="true">↗</span></div>
                    </NuxtLink>
                </div>
                <div class="studio-works__more">
                    <NuxtLink to="/personal">{{ copy('개인 프로젝트', 'Personal projects') }} ↗</NuxtLink>
                    <NuxtLink to="/projects">{{ copy('전체 프로젝트 보기', 'View all projects') }} ↗</NuxtLink>
                </div>
            </section>
            <section id="approach" class="studio-approach studio-section">
                <div class="studio-approach__heading">
                    <h2 class="studio-title">What I do</h2>
                    <p>{{ copy('화면 구현부터 공통화와 운영까지 담당합니다.', 'From screen implementation to shared components and maintenance.') }}</p>
                </div>
                <div class="studio-approach__showcase" :style="{ '--active-row': activeApproach }">
                    <div class="studio-approach__preview" :class="`studio-approach__preview--${approachImages[activeApproach].shape}`">
                        <img
                            v-for="(image, index) in approachImages"
                            :key="image.src"
                            :src="resolveAppPath(image.src)"
                            :alt="index === activeApproach ? copy(image.altKo, image.altEn) : ''"
                            :aria-hidden="index !== activeApproach"
                            :class="{ 'is-active': index === activeApproach }"
                            loading="lazy"
                        />
                    </div>
                    <div class="studio-approach__list">
                        <article
                            v-for="(item, index) in approaches"
                            :key="item.title"
                            class="studio-approach__item"
                            :class="{ 'studio-approach__item--active': activeApproach === index }"
                            @pointerenter="previewApproach($event, index)"
                            @focusin="activeApproach = index"
                        >
                            <h3>
                                <button type="button" :aria-pressed="activeApproach === index" :aria-controls="`approach-description-${index}`" @click="activeApproach = index">
                                    {{ item.title }}
                                </button>
                            </h3>
                            <p :id="`approach-description-${index}`" v-show="activeApproach === index">{{ item.description }}</p>
                        </article>
                    </div>
                </div>
            </section>
            <section class="studio-process studio-section" aria-labelledby="process-title">
                <h2 id="process-title" class="studio-title studio-process__title">{{ copy('작업 방식', 'How I work') }}</h2>
                <p class="studio-process__lead">
                    {{ copy('작은 디테일이 모여,', 'Small details add up') }}
                    <span>{{ copy('좋은 경험이 됩니다.', 'to a better experience.') }}</span>
                </p>
                <ol class="studio-process__grid" role="list">
                    <li v-for="(item, index) in principles" :key="item.title" class="studio-process__step">
                        <BaseIndexLabel class="studio-process__index" aria-hidden="true">[0{{ index + 1 }}]</BaseIndexLabel>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.description }}</p>
                    </li>
                </ol>
            </section>

        </main>
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';
const { t, locale, content } = useLocale();
const { resolveAppPath } = useAppPath();
const copy = (ko: string, en: string) => locale.value === 'ko' ? ko : en;
const profile = computed(() => content.value.profile);
const companies = [
    { id: 'hanjinkal', group: 'web', name: '한진칼 HANJIN KAL', file: 'hanjinkal.svg', project: 'hanjinkal' },
    { id: 'spsamhwa', group: 'systems', name: 'SP SAMHWA', file: 'spsamhwa.svg', project: 'samhwa-eco-dashboard' },
    { id: 'orchem', group: 'systems', name: 'ORCHEM 오알켐', file: 'orchem.svg', project: 'orchem-mes' },
    { id: 'kdone', group: 'web', name: '경동원', file: 'kdone.gif', project: 'kyungdongwon-cms' },
    { id: 'hanon', group: 'web', name: 'Hanon Systems 한온시스템', file: 'hanon.svg', project: 'hanon' },
    { id: 'kleannara', group: 'systems', name: '깨끗한나라', file: 'kleannara.png', project: 'oms' },
    { id: 'jonsoft', group: 'collaboration', name: '조앤소프트', file: 'jonsoft.svg', project: 'framework' },
    { id: 'daeyang', group: 'systems', name: '대양그룹 (대양제지·대양판지)', file: 'daeyang.webp', project: 'scm-daeyang-paper' },
    { id: 'tailim', group: 'systems', name: '태림', file: 'tailim.png', project: 'tos-renewal' },
    { id: 'inu', group: 'web', name: '인천대학교', file: 'inu.webp', project: 'incheon-university' },
    { id: 'concentrix', group: 'collaboration', name: '콘센트릭스 · 한진칼 프로젝트 협업', file: 'concentrix.webp', project: 'hanjinkal' },
    { id: 'i-on', group: 'collaboration', name: '아이온커뮤니케이션즈 · 한진칼 프로젝트 협업', file: 'i-on.webp', project: 'hanjinkal' },
];
const companyGroups = computed(() => [
    { id: 'web', title: copy('기업 웹사이트', 'Corporate websites') },
    { id: 'systems', title: copy('제조·물류 시스템', 'Manufacturing & logistics') },
    { id: 'collaboration', title: copy('사내 개발·기술 협업', 'In-house development & collaboration') },
].map(group => ({ ...group, companies: companies.filter(company => company.group === group.id) })));
// Only pair a device with a capture made for that viewport.
const projectDevices: Record<string, { type: 'phone' | 'tablet'; capture: string }> = {
    'orchem-mes': { type: 'tablet', capture: '/assets/images/projects/orchem-mes/image-05.webp' },
    oms: { type: 'phone', capture: '/assets/images/projects/oms/image-05.webp' },
};
const selectedWorks = computed(() => ['framework', 'orchem-mes', 'hanjinkal', 'samhwa-eco-dashboard', 'oms', 'company-renewal'].map(id => (content.value.works.career as WorkItem[]).find(work => work.id === id)).filter((work): work is WorkItem => Boolean(work)));
const activeApproach = ref(0);
const approachImages = [
    { src: '/assets/images/capabilities/publishing.jpg', altKo: '코드 에디터에서 웹 코드를 작성하는 화면', altEn: 'Web code in an editor', shape: 'wide' },
    { src: '/assets/images/capabilities/ui-development.jpg', altKo: '모바일 UI 흐름을 종이에 설계하는 모습', altEn: 'Sketching mobile UI flows', shape: 'square' },
    { src: '/assets/images/capabilities/design-system.jpg', altKo: '색상 견본과 눈금자를 활용한 디자인 기준 정리', altEn: 'Color swatches and tools for design standards', shape: 'wide' },
    { src: '/assets/images/capabilities/collaboration.jpg', altKo: '팀이 함께 작업 내용을 정리하는 모습', altEn: 'A team planning work together', shape: 'square' },
];
function previewApproach(event: PointerEvent, index: number) {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') activeApproach.value = index;
}
const approaches = computed(() => [
    { title: 'Web Publishing', description: copy('HTML과 SCSS로 디자인 시안을 구현합니다. PC와 모바일의 화면 크기에 맞춰 레이아웃을 조정합니다.', 'Precise HTML and SCSS implementation, with responsive layouts that preserve the intent of the design.') },
    { title: 'UI Development', description: copy('Vue로 입력 폼, 데이터 그리드, 모달을 구현하고 조회와 편집 등 화면 동작을 연결합니다.', 'Vue components connect state and interaction, turning complex workflows into clear interfaces.') },
    { title: 'Design Systems', description: copy('디자인 토큰과 공통 컴포넌트로 반복 작업을 줄이고, 여러 화면에 일관된 기준을 적용합니다.', 'Design tokens and shared components reduce repetitive work and bring consistency across screens.') },
    { title: 'Documentation & Collaboration', description: copy('컴포넌트 사용 방법, 작업 규칙, 예제 코드를 문서로 정리하고 팀원에게 공유합니다.', 'Practical documentation and clear conventions help the next person build with confidence.') },
]);
const principles = computed(() => [
    { title: copy('화면과 상태 정리', 'Define screens and states'), description: copy('요구사항과 디자인을 확인하고, 입력과 조회부터 오류와 로딩까지 필요한 화면 상태를 정리합니다.', 'Review requirements and designs, then define input, results, loading and error states.') },
    { title: copy('컴포넌트 구현', 'Build shared components'), description: copy('반복되는 UI를 컴포넌트로 분리합니다. SCSS와 디자인 토큰으로 화면별 스타일을 관리합니다.', 'Extract recurring UI into components and manage styles with SCSS and design tokens.') },
    { title: copy('검수와 운영 대응', 'Review and maintain'), description: copy('화면 크기와 브라우저별 동작을 확인하고, 사용 방법을 문서화합니다. 운영 중 발견된 오류를 수정합니다.', 'Check layouts and browser behavior, document usage, and fix issues found during operation.') },
]);
usePortfolioSeo(() => ({ title: t('meta.title'), description: t('meta.description'), ogTitle: t('meta.ogTitle'), ogDescription: t('meta.ogDescription'), path: '/', locale: locale.value, imageAlt: t('meta.ogTitle'), dateCreated: '2026-04-16T17:24:07+09:00', dateModified: '2026-11-17T00:00:00+09:00', relatedLinks: ['/about/', '/projects/', '/personal/', '/journey/'], significantLinks: ['/projects/', '/journey/'] }));
</script>

<style lang="scss" src="~/assets/style/pages/_studio.scss" scoped></style>
