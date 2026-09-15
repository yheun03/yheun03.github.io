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

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const initialized = new WeakSet<Element>();
        const intersectionObserver = reducedMotion
            ? undefined
            : new IntersectionObserver(
                  (entries, observer) => {
                      entries.forEach((entry) => {
                          if (!entry.isIntersecting) return;
                          reveal(entry.target as HTMLElement);
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

            if (reducedMotion) reveal(element);
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
            mutationObserver.disconnect();
            intersectionObserver?.disconnect();
        };
    });

    onBeforeUnmount(() => dispose?.());
}
