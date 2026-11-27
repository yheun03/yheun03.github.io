<template>
    <section id="works" class="home-works home-section" aria-labelledby="works-title">
        <div class="home-works__heading" data-reveal="stagger">
            <h2 id="works-title" class="home-title">Selected work</h2>
            <p>
                {{ copy('웹사이트 구축, 업무 화면 개발, 공통 UI 작업을 모았습니다.', 'Websites, business applications and shared UI components.') }}
            </p>
        </div>
        <ul class="home-works__grid" role="list">
            <li v-for="work in selectedWorks" :key="work.id" class="home-works__item">
                <ProjectGalleryCard :work="work" :to="`/projects/${work.id}`" heading-tag="h3" />
            </li>
        </ul>
        <div class="home-works__more" data-reveal="up">
            <NuxtLink to="/personal">{{ copy('개인 프로젝트', 'Personal projects') }} <span aria-hidden="true">↗</span></NuxtLink>
            <NuxtLink to="/projects">{{ copy('전체 프로젝트 보기', 'View all projects') }} <span aria-hidden="true">↗</span></NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { WorkCard } from '@data/works';

const { locale } = useLocale();
const { resolveAppPath } = useAppPath();
const copy = (ko: string, en: string) => (locale.value === 'ko' ? ko : en);
const { data: selectedWorks } = await useAsyncData(
    () => `featured-${locale.value}`,
    () => $fetch<WorkCard[]>(resolveAppPath(`/content/${locale.value}/featured.json`)),
    { default: () => [], deep: false },
);
</script>
