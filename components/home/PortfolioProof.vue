<template>
    <section class="home-companies" data-reveal="companies" :aria-label="copy('참여 프로젝트 및 협업 기업', 'Project clients and collaborators')">
        <h2 class="home-companies__title">{{ copy('참여 프로젝트 및 협업 기업', 'Project clients and collaborators') }}</h2>
        <div v-for="group in companyGroups" :key="group.id" class="home-companies__group">
            <h3>{{ group.title }}</h3>
            <ul class="home-companies__logos">
                <li v-for="company in group.companies" :key="company.id">
                    <NuxtLink :to="`/projects/${company.project}`" :aria-label="`${company.name} ${copy('프로젝트 보기', 'project')}`">
                        <span class="home-companies__logo-frame">
                            <img
                                :src="resolveAppPath(`/assets/images/companies/${company.file}`)"
                                :alt="company.name"
                                :class="`home-companies__logo--${company.id}`"
                                width="160"
                                height="80"
                                loading="lazy"
                            />
                        </span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
const { locale } = useLocale();
const { resolveAppPath } = useAppPath();
const copy = (ko: string, en: string) => (locale.value === 'ko' ? ko : en);
const companies = [
    { id: 'hanjinkal', group: 'web', name: '한진칼 HANJIN KAL', file: 'hanjinkal.svg', project: 'hanjinkal' },
    { id: 'spsamhwa', group: 'systems', name: 'SP SAMHWA', file: 'spsamhwa.svg', project: 'samhwa-eco-dashboard' },
    { id: 'orchem', group: 'systems', name: 'ORCHEM 오알켐', file: 'orchem.svg', project: 'orchem-mes' },
    { id: 'kdone', group: 'web', name: '경동원', file: 'kdone.gif', project: 'kyungdongwon-cms' },
    { id: 'hanon', group: 'web', name: 'Hanon Systems 한온시스템', file: 'hanon.svg', project: 'hanon' },
    { id: 'kleannara', group: 'systems', name: '깨끗한나라', file: 'kleannara.webp', project: 'oms' },
    { id: 'jonsoft', group: 'collaboration', name: '조앤소프트', file: 'jonsoft.svg', project: 'framework' },
    { id: 'daeyang', group: 'systems', name: '대양그룹 (대양제지·대양판지)', file: 'daeyang.webp', project: 'scm-daeyang-paper' },
    { id: 'tailim', group: 'systems', name: '태림', file: 'tailim.webp', project: 'tos-renewal' },
    { id: 'inu', group: 'web', name: '인천대학교', file: 'inu.webp', project: 'incheon-university' },
    { id: 'concentrix', group: 'collaboration', name: '콘센트릭스 · 한진칼 프로젝트 협업', file: 'concentrix.webp', project: 'hanjinkal' },
    { id: 'i-on', group: 'collaboration', name: '아이온커뮤니케이션즈 · 한진칼 프로젝트 협업', file: 'i-on.webp', project: 'hanjinkal' },
];
const companyGroups = computed(() =>
    [
        { id: 'web', title: copy('기업 웹사이트', 'Corporate websites') },
        { id: 'systems', title: copy('제조·물류 시스템', 'Manufacturing & logistics') },
        { id: 'collaboration', title: copy('사내 개발·기술 협업', 'In-house development & collaboration') },
    ].map((group) => ({ ...group, companies: companies.filter((company) => company.group === group.id) })),
);
</script>
