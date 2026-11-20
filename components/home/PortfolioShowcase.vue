<template>
    <section id="works" class="home-works home-section">
        <div class="home-works__heading" data-reveal="stagger">
            <h2 class="home-title">Selected work</h2>
            <p>
                {{ copy('웹사이트 구축, 업무 화면 개발, 공통 UI 작업을 모았습니다.', 'Websites, business applications and shared UI components.') }}
            </p>
        </div>
        <div class="home-works__grid">
            <ProjectGalleryCard v-for="work in selectedWorks" :key="work.id" :work="work" :to="`/projects/${work.id}`" heading-tag="h3" />
        </div>
        <div class="home-works__more" data-reveal="up">
            <NuxtLink to="/personal">{{ copy('개인 프로젝트', 'Personal projects') }} <span aria-hidden="true">↗</span></NuxtLink>
            <NuxtLink to="/projects">{{ copy('전체 프로젝트 보기', 'View all projects') }} <span aria-hidden="true">↗</span></NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
const { locale } = useLocale();
const { data: works } = await useGalleryRouteWorks('career');
const copy = (ko: string, en: string) => (locale.value === 'ko' ? ko : en);
const selectedWorks = computed(() =>
    ['framework', 'orchem-mes', 'hanjinkal', 'samhwa-eco-dashboard', 'oms', 'company-renewal']
        .map((id) => works.value.find((work) => work.id === id))
        .filter((work) => work !== undefined),
);
</script>
