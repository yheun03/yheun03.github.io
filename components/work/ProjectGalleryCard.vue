<template>
    <NuxtLink ref="cardRoot" :to="to" class="gallery-card">
        <div class="gallery-card__stage" :class="{ 'gallery-card__stage--empty': isPlaceholderCover }">
            <GalleryEmptyCapture v-if="isPlaceholderCover" :description="work.captureNotice" />
            <div v-else class="gallery-card__motion">
                <ProjectDeviceMockup :src="coverCapture" :mockup="work.mockup" :device="work.captureDevices?.[coverCapture]" alt="" sizes="(min-width: 641px) 45vw, 90vw" />
            </div>
        </div>
        <div class="gallery-card__heading">
            <component :is="headingTag" class="gallery-card__title">{{ work.title }}</component>
            <span aria-hidden="true">↗</span>
        </div>
        <p class="gallery-card__role">{{ work.role }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { WorkSummary } from '@data/works';
import { isPlaceholderCapture } from '~/composables/gallery/useGallery';

const props = withDefaults(
    defineProps<{
        work: WorkSummary;
        to: string;
        headingTag?: 'h2' | 'h3';
    }>(),
    { headingTag: 'h2' },
);

const coverCapture = computed(() => props.work.captures[0] || '');
const isPlaceholderCover = computed(() => isPlaceholderCapture(coverCapture.value));
const cardRoot = ref<{ $el: HTMLElement } | null>(null);
let dispose: (() => void) | undefined;
let unmounted = false;

// Keep every card's motion here, including cards added by archive filters.
onMounted(async () => {
    if (useReducedEffects()) return;
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
    if (unmounted || !cardRoot.value?.$el) return;
    gsap.registerPlugin(ScrollTrigger);
    const card = cardRoot.value.$el;
    const bounds = card.getBoundingClientRect();
    const initiallyVisible = bounds.top < window.innerHeight && bounds.bottom > 0;
    const media = gsap.matchMedia();

    media.add({
        all: '(min-width: 0px)',
        desktop: '(min-width: 641px)',
        pointer: '(hover: hover) and (pointer: fine)',
        reduce: '(prefers-reduced-motion: reduce)',
    }, (context) => {
        if (context.conditions?.reduce || useReducedEffects()) return;
        // Keep first-viewport cards visible for LCP; animate cards reached by scrolling.
        const reveal = initiallyVisible || bounds.bottom <= 0 ? undefined : gsap.fromTo(card, { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }, {
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.15,
            ease: 'power3.out',
            clearProps: 'opacity,clipPath',
            scrollTrigger: { trigger: card, start: 'clamp(top 55%)', once: true },
        });
        const revealFocused = () => reveal?.progress(1);
        card.addEventListener('focusin', revealFocused);
        let removePointerListeners: (() => void) | undefined;
        const image = card.querySelector('.gallery-card__motion');
        const mockup = card.querySelector('.project-mockup');

        if (context.conditions?.desktop && mockup) {
            gsap.fromTo(mockup, { yPercent: 2 }, {
                yPercent: -2,
                duration: 0.85,
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    start: 'clamp(top 55%)',
                    end: 'clamp(bottom top)',
                    scrub: 0.8,
                },
            });
        }
        if (context.conditions?.desktop && context.conditions?.pointer && image) {
            gsap.set(image, { transformPerspective: 900 });
            const rotateX = gsap.quickTo(image, 'rotationX', { duration: 0.55, ease: 'power3.out' });
            const rotateY = gsap.quickTo(image, 'rotationY', { duration: 0.55, ease: 'power3.out' });
            const zoomX = gsap.quickTo(image, 'scaleX', { duration: 0.55, ease: 'power3.out' });
            const zoomY = gsap.quickTo(image, 'scaleY', { duration: 0.55, ease: 'power3.out' });
            let frame = 0;
            let pointerX = 0;
            let pointerY = 0;
            const updateTilt = () => {
                frame = 0;
                const rect = card.getBoundingClientRect();
                const x = gsap.utils.clamp(-0.5, 0.5, (pointerX - rect.left) / rect.width - 0.5);
                const y = gsap.utils.clamp(-0.5, 0.5, (pointerY - rect.top) / rect.height - 0.5);
                rotateX(-y * 5);
                rotateY(x * 5);
                zoomX(1.025);
                zoomY(1.025);
            };
            // Coalesce high-frequency pointer events into one layout read per frame.
            const move = (event: PointerEvent) => {
                if (event.pointerType === 'touch') return;
                pointerX = event.clientX;
                pointerY = event.clientY;
                if (!frame) frame = requestAnimationFrame(updateTilt);
            };
            const reset = () => {
                cancelAnimationFrame(frame);
                frame = 0;
                rotateX(0);
                rotateY(0);
                zoomX(1);
                zoomY(1);
            };
            card.addEventListener('pointermove', move);
            card.addEventListener('pointerleave', reset);
            card.addEventListener('pointercancel', reset);
            removePointerListeners = () => {
                cancelAnimationFrame(frame);
                card.removeEventListener('pointermove', move);
                card.removeEventListener('pointerleave', reset);
                card.removeEventListener('pointercancel', reset);
            };
        }
        return () => {
            card.removeEventListener('focusin', revealFocused);
            removePointerListeners?.();
        };
    }, card);
    // GSAP batches safe refresh requests from all cards into one delayed refresh.
    ScrollTrigger.refresh(true);
    dispose = () => media.revert();
});

onBeforeUnmount(() => {
    unmounted = true;
    dispose?.();
});
</script>
