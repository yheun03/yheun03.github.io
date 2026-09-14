import type { Ref } from 'vue';

type RevealPreset = 'up' | 'left' | 'right' | 'scale' | 'hero';

const revealFrom: Record<RevealPreset, { x?: number; y?: number; scale?: number; rotate?: number }> = {
    up: { y: 34 },
    left: { x: -32 },
    right: { x: 32 },
    scale: { y: 18, scale: 0.965 },
    hero: { y: 24, scale: 0.985 },
};

/**
 * 페이지 전역의 data-animate와 data-reveal 요소를 한 번만 노출한다.
 * 목록 보기 전환처럼 뒤늦게 추가되는 DOM도 동일한 규칙으로 처리한다.
 */
export function usePageMotion(root: Ref<HTMLElement | null>) {
    let dispose: (() => void) | undefined;

    onMounted(async () => {
        const container = root.value;
        if (!container) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            container.querySelectorAll<HTMLElement>('[data-animate]').forEach((element) => {
                element.classList.add('animate--visible');
            });
            return;
        }

        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
        gsap.registerPlugin(ScrollTrigger);

        const initialized = new WeakSet<Element>();
        const animations: gsap.core.Animation[] = [];
        const triggers: InstanceType<typeof ScrollTrigger>[] = [];
        let syncFrame = 0;

        const setupElement = (element: HTMLElement) => {
            if (initialized.has(element)) return;
            initialized.add(element);

            if (element.hasAttribute('data-animate')) {
                const trigger = ScrollTrigger.create({
                    trigger: element,
                    start: 'top 88%',
                    once: true,
                    onEnter: () => element.classList.add('animate--visible'),
                });
                triggers.push(trigger);
                return;
            }

            const preset = (element.dataset.reveal || 'up') as RevealPreset;
            const from = revealFrom[preset] ?? revealFrom.up;
            const delay = Number(element.dataset.revealDelay || 0) / 1000;
            const duration = preset === 'hero' ? 1 : 0.82;
            const animation = gsap.fromTo(
                element,
                { opacity: 0, ...from },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    duration,
                    delay,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 88%',
                        once: true,
                    },
                },
            );
            animations.push(animation);
        };

        const syncElements = () => {
            container.querySelectorAll<HTMLElement>('[data-animate], [data-reveal]').forEach(setupElement);
            ScrollTrigger.refresh();
        };

        syncElements();

        const observer = new MutationObserver(() => {
            cancelAnimationFrame(syncFrame);
            syncFrame = requestAnimationFrame(syncElements);
        });
        observer.observe(container, { childList: true, subtree: true });

        dispose = () => {
            observer.disconnect();
            cancelAnimationFrame(syncFrame);
            triggers.forEach((trigger) => trigger.kill());
            animations.forEach((animation) => {
                const tween = animation as gsap.core.Tween & { scrollTrigger?: InstanceType<typeof ScrollTrigger> };
                tween.scrollTrigger?.kill();
                animation.kill();
            });
        };
    });

    onBeforeUnmount(() => dispose?.());
}
