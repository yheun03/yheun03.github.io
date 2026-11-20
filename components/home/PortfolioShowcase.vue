<template>
    <section id="works" class="home-works home-section">
        <div class="home-works__heading" data-reveal="stagger">
            <h2 class="home-title">Selected work</h2>
            <p>
                {{ copy('웹사이트 구축, 업무 화면 개발, 공통 UI 작업을 모았습니다.', 'Websites, business applications and shared UI components.') }}
            </p>
        </div>
        <div class="home-works__grid">
            <NuxtLink v-for="(work, index) in selectedWorks" :key="work.id" :to="`/projects/${work.id}`" class="home-work" data-reveal="image">
                <div class="home-work__image" data-parallax :class="`home-work__image--${index % 3}`">
                    <div class="home-work__motion">
                        <ProjectDeviceMockup :src="work.captures[0] || ''" :mockup="work.mockup" alt="" sizes="(min-width: 641px) 32vw, 64vw" />
                    </div>
                </div>
                <div class="home-work__caption">
                    <h3>{{ work.title }}</h3>
                    <span aria-hidden="true">↗</span>
                </div>
            </NuxtLink>
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
