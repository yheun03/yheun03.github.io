<template>
    <section class="home-process home-section" aria-labelledby="process-title">
        <h2 id="process-title" class="home-title home-process__title" data-reveal="up">{{ copy('작업 방식', 'How I work') }}</h2>
        <p class="home-process__lead" data-reveal="title">
            {{ copy('작은 디테일이 모여,', 'Small details add up') }}
            <span>{{ copy('좋은 경험이 됩니다.', 'to a better experience.') }}</span>
        </p>
        <ol class="home-process__grid" data-reveal="stagger" role="list">
            <li v-for="(item, index) in principles" :key="item.title" class="home-process__step">
                <BaseIndexLabel class="home-process__index" aria-hidden="true">[0{{ index + 1 }}]</BaseIndexLabel>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
            </li>
        </ol>
    </section>
</template>

<script setup lang="ts">
const { locale } = useLocale();
const copy = (ko: string, en: string) => (locale.value === 'ko' ? ko : en);
const principles = computed(() => [
    {
        title: copy('화면과 상태 정리', 'Define screens and states'),
        description: copy(
            '요구사항과 디자인을 확인하고, 입력과 조회부터 오류와 로딩까지 필요한 화면 상태를 정리합니다.',
            'Review requirements and designs, then define input, results, loading and error states.',
        ),
    },
    {
        title: copy('컴포넌트 구현', 'Build shared components'),
        description: copy(
            '반복되는 UI를 컴포넌트로 분리합니다. SCSS와 디자인 토큰으로 화면별 스타일을 관리합니다.',
            'Extract recurring UI into components and manage styles with SCSS and design tokens.',
        ),
    },
    {
        title: copy('검수와 운영 대응', 'Review and maintain'),
        description: copy(
            '화면 크기와 브라우저별 동작을 확인하고, 사용 방법을 문서화합니다. 운영 중 발견된 오류를 수정합니다.',
            'Check layouts and browser behavior, document usage, and fix issues found during operation.',
        ),
    },
]);
</script>
