<template>
    <section id="approach" class="home-approach home-section">
        <div class="home-approach__heading">
            <h2 class="home-title">What I do</h2>
            <p>{{ copy('화면 구현부터 공통화와 운영까지 담당합니다.', 'From screen implementation to shared components and maintenance.') }}</p>
        </div>
        <div class="home-approach__showcase" :style="{ '--active-row': activeApproach }">
            <div class="home-approach__preview" :class="`home-approach__preview--${approachImages[activeApproach].shape}`">
                <BaseMediaImage
                    :src="resolveAppPath(approachImages[activeApproach].src)"
                    :alt="copy(approachImages[activeApproach].altKo, approachImages[activeApproach].altEn)"
                    class="is-active"
                    sizes="(min-width: 641px) 30vw, 90vw"
                />
            </div>
            <div class="home-approach__list">
                <article
                    v-for="(item, index) in approaches"
                    :key="item.title"
                    class="home-approach__item"
                    :class="{ 'home-approach__item--active': activeApproach === index }"
                    @pointerenter="previewApproach($event, index)"
                    @focusin="activeApproach = index"
                >
                    <h3>
                        <button
                            type="button"
                            :aria-expanded="activeApproach === index"
                            :aria-controls="`approach-description-${index}`"
                            @click="activeApproach = index"
                        >
                            {{ item.title }}
                        </button>
                    </h3>
                    <p :id="`approach-description-${index}`" v-show="activeApproach === index">{{ item.description }}</p>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { locale } = useLocale();
const { resolveAppPath } = useAppPath();
const copy = (ko: string, en: string) => (locale.value === 'ko' ? ko : en);
const activeApproach = ref(0);
const approachImages = [
    {
        src: '/assets/images/capabilities/publishing.jpg',
        altKo: '코드 에디터에서 웹 코드를 작성하는 화면',
        altEn: 'Web code in an editor',
        shape: 'wide',
    },
    {
        src: '/assets/images/capabilities/ui-development.jpg',
        altKo: '모바일 UI 흐름을 종이에 설계하는 모습',
        altEn: 'Sketching mobile UI flows',
        shape: 'square',
    },
    {
        src: '/assets/images/capabilities/design-system.jpg',
        altKo: '색상 견본과 눈금자를 활용한 디자인 기준 정리',
        altEn: 'Color swatches and tools for design standards',
        shape: 'wide',
    },
    {
        src: '/assets/images/capabilities/collaboration.jpg',
        altKo: '팀이 함께 작업 내용을 정리하는 모습',
        altEn: 'A team planning work together',
        shape: 'square',
    },
];
function previewApproach(event: PointerEvent, index: number) {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') activeApproach.value = index;
}
const approaches = computed(() => [
    {
        title: 'Web Publishing',
        description: copy(
            'HTML과 SCSS로 디자인 시안을 구현합니다. PC와 모바일의 화면 크기에 맞춰 레이아웃을 조정합니다.',
            'Precise HTML and SCSS implementation, with responsive layouts that preserve the intent of the design.',
        ),
    },
    {
        title: 'UI Development',
        description: copy(
            'Vue로 입력 폼, 데이터 그리드, 모달을 구현하고 조회와 편집 등 화면 동작을 연결합니다.',
            'Vue components connect state and interaction, turning complex workflows into clear interfaces.',
        ),
    },
    {
        title: 'Design Systems',
        description: copy(
            '디자인 토큰과 공통 컴포넌트로 반복 작업을 줄이고, 여러 화면에 일관된 기준을 적용합니다.',
            'Design tokens and shared components reduce repetitive work and bring consistency across screens.',
        ),
    },
    {
        title: 'Documentation & Collaboration',
        description: copy(
            '컴포넌트 사용 방법, 작업 규칙, 예제 코드를 문서로 정리하고 팀원에게 공유합니다.',
            'Practical documentation and clear conventions help the next person build with confidence.',
        ),
    },
]);
</script>
