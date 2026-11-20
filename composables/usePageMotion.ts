import type { Ref } from 'vue';

/** Enhance the existing markup; keep SSR and reduced-motion content visible. */
export function usePageMotion(root: Ref<HTMLElement | null>) {
    let dispose: (() => void) | undefined;
    let unmounted = false;

    onMounted(async () => {
        if (!root.value || useReducedEffects()) return;

        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
        if (unmounted || !root.value) return;

        gsap.registerPlugin(ScrollTrigger);
        const scope = root.value;
        // Start at 60% from the top, leaving the lower 40% as the entry zone.
        // Clamp keeps triggers near the footer within the page's scroll range.
        const scrollStart = 'clamp(top 60%)';
        const media = gsap.matchMedia();

        media.add(
            {
                desktop: '(min-width: 641px)',
                mobile: '(max-width: 640px)',
                pointer: '(hover: hover) and (pointer: fine)',
                reduce: '(prefers-reduced-motion: reduce)',
            },
            (context) => {
                if (context.conditions?.reduce || useReducedEffects()) return;
                const desktop = context.conditions?.desktop;
                const distance = desktop ? 28 : 18;
                const reveals = new Map<HTMLElement, gsap.core.Tween>();
                const removeListeners: (() => void)[] = [];

                // Play each entrance once when it reaches the shared viewport line.
                scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
                    if (element.getBoundingClientRect().bottom <= 0) return;
                    const mode = element.dataset.reveal;
                    const targets = mode === 'companies'
                        ? element.querySelectorAll('.home-companies__logos > li')
                        : mode === 'stagger' ? Array.from(element.children) : element;
                    const from: gsap.TweenVars = { opacity: 0, y: distance };
                    if (mode === 'companies') Object.assign(from, { y: 24 });
                    if (mode === 'title') Object.assign(from, { y: 20, clipPath: 'inset(0% 0% 100% 0%)' });
                    if (mode === 'image') Object.assign(from, { y: 0, clipPath: 'inset(0% 0% 100% 0%)' });
                    if (mode === 'right') Object.assign(from, { x: -24, y: 0 });
                    if (mode === 'scale') Object.assign(from, { scale: 0.96, y: 0 });

                    const tween = gsap.fromTo(targets, from, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        ...(['title', 'image'].includes(mode ?? '') ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}),
                        duration: mode === 'companies' ? 0.65 : mode === 'image' ? 1.15 : 0.85,
                        stagger: mode === 'companies' ? 0.085 : mode === 'stagger' ? 0.1 : 0,
                        ease: 'power3.out',
                        clearProps: 'opacity,transform,clipPath',
                        scrollTrigger: { trigger: element, start: scrollStart, once: true },
                    });
                    reveals.set(element, tween);
                });

                // Print the wordmark in place, then finish with its accent dot.
                const aboutMark = scope.querySelector('.about-page__mark');
                if (aboutMark && aboutMark.getBoundingClientRect().bottom > 0) {
                    const letters = aboutMark.querySelectorAll('.about-page__letter');
                    const dot = aboutMark.querySelector('.about-page__dot');
                    const logo = gsap.timeline({
                        scrollTrigger: { trigger: aboutMark, start: scrollStart, once: true },
                    });
                    logo.fromTo(letters, { opacity: 0, scaleX: 0.96, transformOrigin: '50% 50%' }, {
                        opacity: 1,
                        scaleX: 1,
                        duration: 0.55,
                        stagger: 0.12,
                        ease: 'power2.out',
                        clearProps: 'opacity,transform,transformOrigin',
                    });
                    if (dot) logo.fromTo(dot, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.35,
                        ease: 'back.out(1.2)',
                        clearProps: 'opacity,transform,transformOrigin',
                    }, '-=0.08');
                }

                const lines = scope.querySelectorAll('.home-hero__line-inner');
                if (lines.length && scope.querySelector('.home-hero')!.getBoundingClientRect().bottom > 0) {
                    gsap.fromTo(lines, { yPercent: 115, rotation: 1.5 }, {
                        yPercent: 0,
                        rotation: 0,
                        duration: 1.2,
                        stagger: 0.14,
                        ease: 'power4.out',
                        clearProps: 'transform',
                        scrollTrigger: { trigger: scope.querySelector('.home-hero__heading'), start: scrollStart, once: true },
                    });
                }

                scope.querySelectorAll<HTMLElement>('.home-stats > div, .home-process__step, .home-works__more').forEach((element) => {
                    gsap.fromTo(element, { '--rule-progress': 0 }, {
                        '--rule-progress': 1,
                        duration: 1.2,
                        ease: 'power3.inOut',
                        scrollTrigger: { trigger: element, start: scrollStart, once: true },
                    });
                });

                scope.querySelectorAll('.home-about__statement strong').forEach((element) => {
                    gsap.fromTo(element, { '--ink-progress': '0%' }, {
                        '--ink-progress': '100%',
                        ease: 'none',
                        scrollTrigger: { trigger: element, start: scrollStart, end: 'clamp(bottom 30%)', scrub: 0.5 },
                    });
                });

                scope.querySelectorAll('.home-stats strong').forEach((element) => {
                    gsap.fromTo(element, { rotationX: -25, y: 16, opacity: 0, transformOrigin: 'center bottom', transformPerspective: 600 }, {
                        rotationX: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power3.out',
                        clearProps: 'transform,transformOrigin,opacity',
                        scrollTrigger: { trigger: element, start: scrollStart, once: true },
                    });
                });

                // Keep mobile scrolling direct; reserve the deeper image motion for wide layouts.
                if (desktop) {
                    const hero = scope.querySelector('.home-hero');
                    if (hero) {
                        gsap.to(scope.querySelectorAll('.home-hero__line'), {
                            xPercent: (index) => index === 0 ? 1.5 : 3,
                            ease: 'none',
                            scrollTrigger: { trigger: hero, start: scrollStart, end: 'clamp(bottom top)', scrub: 0.7 },
                        });
                    }
                    const footerTitle = scope.querySelector('.portfolio-footer__title a');
                    if (footerTitle) gsap.fromTo(footerTitle, { y: 18 }, {
                        y: 0,
                        ease: 'none',
                        scrollTrigger: { trigger: footerTitle.parentElement, start: scrollStart, end: 'clamp(top 30%)', scrub: 0.7 },
                    });
                    scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((element) => {
                        const target = element.querySelector('.project-mockup');
                        if (!target) return;
                        gsap.fromTo(target, { yPercent: 2 }, {
                            yPercent: -2,
                            ease: 'none',
                            scrollTrigger: { trigger: element, start: scrollStart, end: 'clamp(bottom top)', scrub: 0.8 },
                        });
                    });
                    const statement = scope.querySelector('.home-process__lead > span');
                    if (statement) gsap.fromTo(statement, { x: 24 }, {
                        x: 0,
                        ease: 'none',
                        scrollTrigger: { trigger: statement, start: scrollStart, end: 'clamp(top 30%)', scrub: 0.6 },
                    });
                }

                if (desktop && context.conditions?.pointer) {
                    scope.querySelectorAll<HTMLElement>('.home-work').forEach((card) => {
                        const image = card.querySelector('.home-work__motion');
                        if (!image) return;
                        gsap.set(image, { transformPerspective: 900 });
                        const rotateX = gsap.quickTo(image, 'rotationX', { duration: 0.55, ease: 'power3.out' });
                        const rotateY = gsap.quickTo(image, 'rotationY', { duration: 0.55, ease: 'power3.out' });
                        const zoom = gsap.quickTo(image, 'scale', { duration: 0.55, ease: 'power3.out' });
                        const move = (event: PointerEvent) => {
                            if (event.pointerType === 'touch') return;
                            const bounds = card.getBoundingClientRect();
                            const x = gsap.utils.clamp(-0.5, 0.5, (event.clientX - bounds.left) / bounds.width - 0.5);
                            const y = gsap.utils.clamp(-0.5, 0.5, (event.clientY - bounds.top) / bounds.height - 0.5);
                            rotateX(-y * 5);
                            rotateY(x * 5);
                            zoom(1.025);
                        };
                        const reset = () => { rotateX(0); rotateY(0); zoom(1); };
                        card.addEventListener('pointermove', move);
                        card.addEventListener('pointerleave', reset);
                        card.addEventListener('pointercancel', reset);
                        removeListeners.push(() => {
                            card.removeEventListener('pointermove', move);
                            card.removeEventListener('pointerleave', reset);
                            card.removeEventListener('pointercancel', reset);
                        });
                    });
                }

                // Keyboard navigation must reveal a focused link immediately.
                const revealFocused = (event: FocusEvent) => {
                    if (!(event.target instanceof HTMLElement)) return;
                    for (const [element, tween] of reveals) {
                        if (element.contains(event.target)) tween.progress(1);
                    }
                };
                scope.addEventListener('focusin', revealFocused);
                return () => {
                    scope.removeEventListener('focusin', revealFocused);
                    removeListeners.forEach((remove) => remove());
                };
            },
            scope,
        );

        // Images, locale changes and expanding content can change trigger positions.
        let frame = 0;
        const refresh = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        };
        const resizeObserver = new ResizeObserver(refresh);
        resizeObserver.observe(scope);
        scope.addEventListener('load', refresh, true);
        document.fonts.ready.then(() => { if (!unmounted) refresh(); });
        refresh();

        dispose = () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            scope.removeEventListener('load', refresh, true);
            media.revert();
        };
    });

    onBeforeUnmount(() => {
        unmounted = true;
        dispose?.();
    });
}
