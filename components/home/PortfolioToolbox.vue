<template>
    <section id="approach" class="home-approach home-section" aria-labelledby="approach-title">
        <div class="home-approach__heading" data-reveal="stagger">
            <h2 id="approach-title" class="home-title">What I do</h2>
            <p>{{ copy('화면 구현부터 공통화와 운영까지 담당합니다.', 'From screen implementation to shared components and maintenance.') }}</p>
        </div>
        <div
            ref="showcase"
            class="home-approach__showcase"
            :class="{ 'home-approach__showcase--interactive': interactive, 'home-approach__showcase--following': following }"
            data-reveal="up"
            @pointerenter="enterPreview"
            @pointermove="movePreview"
            @pointerleave="leavePreview"
            @pointercancel="leavePreview"
        >
            <div
                ref="preview"
                class="home-approach__preview"
                :class="[
                    `home-approach__preview--${approachImages[visibleImage].shape}`,
                    { 'is-ready': loadedImages.has(visibleImage) },
                ]"
            >
                <BaseMediaImage
                    v-for="(image, index) in approachImages"
                    :key="image.src"
                    :src="resolveAppPath(image.src)"
                    :alt="copy(image.altKo, image.altEn)"
                    :class="{ 'is-active': visibleImage === index }"
                    :aria-hidden="visibleImage !== index"
                    eager
                    @load="markLoaded(index)"
                    sizes="(min-width: 641px) 25vw, 90vw"
                />
            </div>
            <ul class="home-approach__list" role="list">
                <li
                    v-for="(item, index) in approaches"
                    :key="item.title"
                    class="home-approach__item"
                    :class="{ 'home-approach__item--active': activeApproach === index }"
                    @pointerenter="previewApproach($event, index)"
                >
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                </li>
            </ul>
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
        src: '/assets/images/capabilities/publishing.webp',
        altKo: '코드 에디터에서 웹 코드를 작성하는 화면',
        altEn: 'Web code in an editor',
        shape: 'wide',
    },
    {
        src: '/assets/images/capabilities/ui-development.webp',
        altKo: '모바일 UI 흐름을 종이에 설계하는 모습',
        altEn: 'Sketching mobile UI flows',
        shape: 'square',
    },
    {
        src: '/assets/images/capabilities/design-system.webp',
        altKo: '색상 견본과 눈금자를 활용한 디자인 기준 정리',
        altEn: 'Color swatches and tools for design standards',
        shape: 'wide',
    },
    {
        src: '/assets/images/capabilities/collaboration.webp',
        altKo: '팀이 함께 작업 내용을 정리하는 모습',
        altEn: 'A team planning work together',
        shape: 'square',
    },
];
const showcase = ref<HTMLElement | null>(null);
const preview = ref<HTMLElement | null>(null);
const interactive = ref(false);
const following = ref(false);
let moveX: ((value: number, start?: number) => void) | undefined;
let moveY: ((value: number, start?: number) => void) | undefined;
let pointerInside = false;
let pointerX = 0;
let pointerY = 0;
let dispose: (() => void) | undefined;
let unmounted = false;
const loadedImages = reactive(new Set<number>());
const visibleImage = ref(0);

async function markLoaded(index: number) {
    const image = preview.value?.querySelectorAll('img')[index];
    if (!image?.complete || !image.naturalWidth) return;
    await image.decode().catch(() => {});
    loadedImages.add(index);
    if (index === activeApproach.value || !loadedImages.has(visibleImage.value)) visibleImage.value = index;
}
onMounted(() => {
    preview.value?.querySelectorAll('img').forEach((image, index) => {
        if (image.complete && image.naturalWidth) markLoaded(index);
    });
});
watch(activeApproach, (index) => {
    if (loadedImages.has(index)) visibleImage.value = index;
});

// Reuse the site's deferred GSAP loading for a cursor-centred preview.
onMotionReady(async () => {
    if (unmounted || useReducedEffects() || !window.matchMedia('(min-width: 641px) and (hover: hover) and (pointer: fine)').matches) return;
    const { gsap } = await import('gsap');
    if (unmounted || !preview.value) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 641px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const image = preview.value!;
        gsap.set(image, { xPercent: -50, yPercent: -50 });
        moveX = gsap.quickTo(image, 'x', { duration: 0.45, ease: 'power3.out' });
        moveY = gsap.quickTo(image, 'y', { duration: 0.45, ease: 'power3.out' });
        interactive.value = true;
        if (pointerInside) {
            moveX(pointerX, pointerX);
            moveY(pointerY, pointerY);
            following.value = true;
        }
        return () => {
            interactive.value = false;
            following.value = false;
            moveX = undefined;
            moveY = undefined;
        };
    });
    dispose = () => media.revert();
});

function enterPreview(event: PointerEvent) {
    if (event.pointerType === 'touch') return;
    pointerInside = true;
    movePreview(event, true);
    following.value = interactive.value;
}

function movePreview(event: PointerEvent, snap = false) {
    if (event.pointerType === 'touch') return;
    const bounds = showcase.value?.getBoundingClientRect();
    if (!bounds) return;
    pointerX = event.clientX - bounds.left;
    pointerY = event.clientY - bounds.top;
    moveX?.(pointerX, snap ? pointerX : undefined);
    moveY?.(pointerY, snap ? pointerY : undefined);
}

function leavePreview() {
    pointerInside = false;
    following.value = false;
}

onBeforeUnmount(() => {
    unmounted = true;
    dispose?.();
});

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
