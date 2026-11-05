import type { Ref } from 'vue';

const motionSelector = '[data-animate], [data-reveal]';

function reveal(element: HTMLElement) {
    if (element.hasAttribute('data-animate')) element.classList.add('animate--visible');
    if (element.hasAttribute('data-reveal')) element.classList.add('reveal--visible');
}

/** 현재 페이지와 보기 전환으로 추가되는 요소를 네이티브 Observer로 한 번만 노출한다. */
export function usePageMotion(root: Ref<HTMLElement | null>) {
    let dispose: (() => void) | undefined;

    onMounted(() => {
        const container = root.value;
        if (!container) return;

        const reducedEffects = useReducedEffects();
        const initialized = new WeakSet<Element>();
        const countFrames = new Set<number>();
        let disposed = false;

        const revealElement = (element: HTMLElement) => {
            reveal(element);
            if (reducedEffects || !element.matches('.base-stat-list')) return;

            const values = Array.from(element.querySelectorAll<HTMLElement>('[data-count-to]'));
            values.forEach((value) => {
                value.textContent = '0';
            });

            // 카드와 항목의 등장 모션이 모두 끝난 뒤 왼쪽부터 숫자를 올린다.
            Promise.allSettled(element.getAnimations({ subtree: true }).map((animation) => animation.finished)).then(() => {
                if (disposed || !element.isConnected) return;
                const startedAt = performance.now();
                const duration = 1000;
                const tick = (now: number) => {
                    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    let pending = false;
                    values.forEach((value, index) => {
                        if (!value.isConnected) return;
                        const progress = reduced ? 1 : Math.min(1, Math.max(0, (now - startedAt - index * 180) / duration));
                        const target = Number(value.dataset.countTo);
                        const decimals = value.dataset.countTo?.split('.')[1]?.length ?? 0;
                        value.textContent = progress === 1 ? value.dataset.countTo! : (target * (1 - (1 - progress) ** 3)).toFixed(decimals);
                        if (progress < 1) pending = true;
                    });
                    if (pending) {
                        const frame = requestAnimationFrame((time) => {
                            countFrames.delete(frame);
                            tick(time);
                        });
                        countFrames.add(frame);
                    }
                };
                tick(startedAt);
            });
        };
        const intersectionObserver = reducedEffects
            ? undefined
            : new IntersectionObserver(
                  (entries, observer) => {
                      entries.forEach((entry) => {
                          if (!entry.isIntersecting) return;
                          revealElement(entry.target as HTMLElement);
                          observer.unobserve(entry.target);
                      });
                  },
                  { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
              );

        const setupElement = (element: HTMLElement) => {
            if (initialized.has(element)) return;
            initialized.add(element);

            const delay = Number(element.dataset.revealDelay || 0);
            if (delay > 0) element.style.setProperty('--reveal-delay', `${delay}ms`);

            if (reducedEffects) revealElement(element);
            else intersectionObserver?.observe(element);
        };

        const setupTree = (root: ParentNode) => root.querySelectorAll<HTMLElement>(motionSelector).forEach(setupElement);
        setupTree(container);

        const mutationObserver = new MutationObserver((records) => {
            records.forEach((record) => {
                record.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;
                    if (node.matches(motionSelector)) setupElement(node);
                    setupTree(node);
                });
            });
        });
        mutationObserver.observe(container, { childList: true, subtree: true });

        dispose = () => {
            disposed = true;
            countFrames.forEach(cancelAnimationFrame);
            mutationObserver.disconnect();
            intersectionObserver?.disconnect();
        };
    });

    onBeforeUnmount(() => dispose?.());
}
