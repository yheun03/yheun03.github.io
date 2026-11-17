<template>
    <section ref="sectionRef" :id="id" class="section section--body-centered" :class="sectionClass" :aria-labelledby="titleId">
        <header v-if="$slots.head" class="section-head" :class="headClass">
            <slot name="head" />
        </header>
        <BaseSectionTitle
            v-else-if="title"
            :title-id="titleId"
            :eyebrow="eyebrow"
            :title="title"
            :description="description"
            :animate="animateTitle"
        />
        <slot />
    </section>
</template>

<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | undefined;
let layoutFrame = 0;

function updateBodyCenter() {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(() => {
        const section = sectionRef.value;
        if (!section || !section.closest('.portfolio-page--home')) return;
        const children = Array.from(section.children) as HTMLElement[];
        const head = children[0];
        if (!head || children.length < 2) return;
        const style = getComputedStyle(section);
        const gap = parseFloat(style.rowGap) || 0;
        const padding = parseFloat(style.paddingTop) || 0;
        const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--layout-header-height')) || 0;
        const contentHeight = children.reduce((height, child) => height + child.offsetHeight, 0) + gap * (children.length - 1);
        const spareHeight = Math.max(0, window.innerHeight - header - contentHeight - padding * 2);
        // 타이틀과 간격만큼 아래 여백을 더해 본문 묶음의 중심을 화면 중앙에 맞춘다.
        const offset = Math.min(head.offsetHeight + gap, spareHeight);
        section.style.setProperty('--section-center-offset', `${Math.round(offset)}px`);
    });
}

onMounted(() => {
    if (!sectionRef.value) return;
    resizeObserver = new ResizeObserver(updateBodyCenter);
    resizeObserver.observe(sectionRef.value);
    Array.from(sectionRef.value.children).forEach((child) => resizeObserver?.observe(child));
    window.addEventListener('resize', updateBodyCenter);
    updateBodyCenter();
});

onBeforeUnmount(() => {
    cancelAnimationFrame(layoutFrame);
    resizeObserver?.disconnect();
    window.removeEventListener('resize', updateBodyCenter);
});

withDefaults(
    defineProps<{
        id: string;
        titleId: string;
        sectionClass?: string;
        headClass?: string;
        eyebrow?: string;
        title?: string;
        description?: string;
        animateTitle?: boolean;
    }>(),
    { animateTitle: true },
);
</script>
