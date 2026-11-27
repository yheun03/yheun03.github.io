// The first viewport is server-rendered. Scroll and pointer effects are needed once interaction starts.
let firstInteraction: Promise<void> | undefined;

export function onMotionReady(callback: () => void) {
    onNuxtReady(() => {
        firstInteraction ??= new Promise<void>((resolve) => {
            if (window.scrollY > 0) return resolve();
            const controller = new AbortController();
            const start = () => {
                controller.abort();
                resolve();
            };
            for (const event of ['wheel', 'scroll', 'touchstart', 'pointermove', 'pointerdown', 'keydown']) {
                window.addEventListener(event, start, { passive: true, signal: controller.signal });
            }
        });
        firstInteraction.then(callback);
    });
}
