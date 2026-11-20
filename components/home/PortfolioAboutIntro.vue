<template>
    <section id="about" class="home-about home-section">
        <h2 class="home-title">About</h2>
        <div class="home-about__content">
            <p v-if="locale === 'ko'" class="home-about__statement"><strong>기업 홈페이지부터 제조와 물류 시스템까지</strong> 구현하고 운영해 왔습니다.</p>
            <p v-else class="home-about__statement">
                I build and maintain <strong>corporate websites, manufacturing systems and logistics interfaces.</strong>
            </p>
            <p v-if="locale === 'ko'">
                화면 퍼블리싱을 시작으로 <strong>Vue 컴포넌트와 사내 프레임워크 개발</strong>까지 업무를 넓혔습니다. 반복되는 UI를 공통화하고, 팀에서 사용할 수
                있도록 작업 기준과 사용 방법을 문서로 정리합니다.
            </p>
            <p v-else>
                My work has expanded from web publishing to <strong>Vue components and an internal framework.</strong> I turn recurring UI into shared
                components and document conventions and usage for the team.
            </p>
            <NuxtLink class="home-text-link" to="/about">{{ copy('경력 자세히 보기', 'More about my experience') }} <span aria-hidden="true">↗</span></NuxtLink>
            <div class="home-stats">
                <div v-for="stat in profile.stats" :key="stat.label">
                    <strong
                        >{{ stat.value }}<span>{{ stat.suffix }}</span></strong
                    >
                    <h3>{{ stat.label }}</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { locale, content } = useLocale();
const copy = (ko: string, en: string) => (locale.value === 'ko' ? ko : en);
const profile = computed(() => content.value.profile);
</script>
