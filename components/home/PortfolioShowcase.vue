<template>
    <section id="works" class="home-works home-section">
        <div class="home-works__heading">
            <h2 class="home-title">Selected work</h2>
            <p>
                {{ copy('웹사이트 구축, 업무 화면 개발, 공통 UI 작업을 모았습니다.', 'Websites, business applications and shared UI components.') }}
            </p>
        </div>
        <div class="home-works__grid">
            <NuxtLink v-for="(work, index) in selectedWorks" :key="work.id" :to="`/projects/${work.id}`" class="home-work">
                <div class="home-work__image" :class="[`home-work__image--${index % 3}`, { 'home-work__image--paired': projectDevices[work.id] }]">
                    <div class="home-mockup home-mockup--laptop">
                        <div class="home-mockup__screen">
                            <BaseMediaImage
                                :src="resolveAppPath(work.captures[0] || '')"
                                :alt="`${work.title} ${copy('PC 화면', 'desktop interface')}`"
                                sizes="(min-width: 641px) 32vw, 64vw"
                            />
                        </div>
                        <div class="home-mockup__base" aria-hidden="true"></div>
                    </div>
                    <div v-if="projectDevices[work.id]" class="home-mockup" :class="`home-mockup--${projectDevices[work.id].type}`">
                        <div class="home-mockup__screen">
                            <BaseMediaImage
                                :src="resolveAppPath(projectDevices[work.id].capture)"
                                :alt="`${work.title} ${projectDevices[work.id].type === 'phone' ? copy('모바일 화면', 'mobile interface') : copy('태블릿 화면', 'tablet interface')}`"
                                :sizes="projectDevices[work.id].sizes"
                            />
                        </div>
                    </div>
                </div>
                <div class="home-work__caption">
                    <h3>{{ work.title }}</h3>
                    <span aria-hidden="true">↗</span>
                </div>
            </NuxtLink>
        </div>
        <div class="home-works__more">
            <NuxtLink to="/personal">{{ copy('개인 프로젝트', 'Personal projects') }} ↗</NuxtLink>
            <NuxtLink to="/projects">{{ copy('전체 프로젝트 보기', 'View all projects') }} ↗</NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
const { locale } = useLocale();
const { data: works } = await useGalleryRouteWorks('career');
const { resolveAppPath } = useAppPath();
const copy = (ko: string, en: string) => (locale.value === 'ko' ? ko : en);
// Only pair a device with a capture made for that viewport.
const projectDevices: Record<string, { type: 'phone' | 'tablet'; capture: string; sizes: string }> = {
    'orchem-mes': { type: 'tablet', capture: '/assets/images/projects/orchem-mes/image-05.webp', sizes: '(min-width: 641px) 16vw, 36vw' },
    oms: { type: 'phone', capture: '/assets/images/projects/oms/image-05.webp', sizes: '(min-width: 641px) 8vw, 16vw' },
};
const selectedWorks = computed(() =>
    ['framework', 'orchem-mes', 'hanjinkal', 'samhwa-eco-dashboard', 'oms', 'company-renewal']
        .map((id) => works.value.find((work) => work.id === id))
        .filter((work) => work !== undefined),
);
</script>
