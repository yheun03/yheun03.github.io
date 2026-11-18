import type { Ref } from 'vue';

/** Keep SSR/above-the-fold content visible; enhance only sections below the viewport. */
export function usePageMotion(root: Ref<HTMLElement | null>) {
    let observer: IntersectionObserver | undefined;

    onMounted(() => {
        if (!root.value || useReducedEffects() || !('IntersectionObserver' in window)) return;
        const elements = [...root.value.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
            (element) => element.getBoundingClientRect().top >= window.innerHeight,
        );
        if (!elements.length) return;

        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.classList.remove('reveal--pending');
                    observer?.unobserve(entry.target);
                }
            },
            { threshold: 0.01 },
        );

        for (const element of elements) {
            element.classList.add('reveal--pending');
            observer.observe(element);
        }
    });

    onBeforeUnmount(() => observer?.disconnect());
}
