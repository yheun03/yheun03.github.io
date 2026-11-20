import type { Ref } from 'vue';

/** Mouse dragging supplements native wheel, touch and keyboard scrolling. */
export function useDragScroll(root: Ref<HTMLElement | null>) {
    let active: HTMLElement | null = null;
    let pointerId = -1;
    let startY = 0;
    let startScrollTop = 0;
    let dispose: (() => void) | undefined;

    function finishDrag() {
        const element = active;
        active = null;
        if (!element) return;
        element.classList.remove('is-dragging');
        if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
        pointerId = -1;
    }

    function startDrag(event: PointerEvent) {
        // Touch scrolling stays native, including momentum and pinch zoom.
        if (event.pointerType !== 'mouse' || event.button !== 0 || !event.isPrimary) return;
        const element = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-drag-scroll]') : null;
        if (!element || !root.value?.contains(element) || element.scrollHeight <= element.clientHeight) return;
        // Leave the scrollbar thumb available for native dragging.
        if (event.clientX >= element.getBoundingClientRect().right - 6) return;
        finishDrag();
        active = element;
        pointerId = event.pointerId;
        startY = event.clientY;
        startScrollTop = element.scrollTop;
        element.focus({ preventScroll: true });
        element.setPointerCapture(pointerId);
        element.classList.add('is-dragging');
        event.preventDefault();
    }

    function moveDrag(event: PointerEvent) {
        if (!active || event.pointerId !== pointerId) return;
        active.scrollTop = startScrollTop + startY - event.clientY;
        event.preventDefault();
    }

    onMounted(() => {
        const element = root.value;
        if (!element) return;
        element.addEventListener('pointerdown', startDrag);
        element.addEventListener('pointermove', moveDrag);
        element.addEventListener('pointerup', finishDrag);
        element.addEventListener('pointercancel', finishDrag);
        element.addEventListener('lostpointercapture', finishDrag);
        dispose = () => {
            finishDrag();
            element.removeEventListener('pointerdown', startDrag);
            element.removeEventListener('pointermove', moveDrag);
            element.removeEventListener('pointerup', finishDrag);
            element.removeEventListener('pointercancel', finishDrag);
            element.removeEventListener('lostpointercapture', finishDrag);
        };
    });
    onBeforeUnmount(() => dispose?.());
}
