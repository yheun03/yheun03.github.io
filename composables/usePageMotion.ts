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
        // Capture the first viewport before GSAP changes any element positions.
        const initiallyVisible = new WeakSet<Element>();
        const aboveViewport = new WeakSet<Element>();
        scope.querySelectorAll(`
            [data-reveal], .about-page__mark, .home-hero__heading, .home-hero,
            .home-stats > div, .home-stats strong, .home-process__step, .home-works__more,
            .home-about__statement strong, .portfolio-footer__title,
            [data-parallax], .home-process__lead > span
        `).forEach((element) => {
            const bounds = element.getBoundingClientRect();
            if (bounds.top < window.innerHeight && bounds.bottom > 0) initiallyVisible.add(element);
            if (bounds.bottom <= 0) aboveViewport.add(element);
        });

        // Keep first-viewport content painted; entrances below it wait for the 55% line.
        function motionTrigger(element: Element, options: { start?: string; end?: string; scrub?: number } = {}) {
            if (initiallyVisible.has(element) && options.scrub === undefined) return undefined;
            return {
                trigger: element,
                start: 'clamp(top 55%)',
                once: options.scrub === undefined,
                ...options,
            };
        }
        const media = gsap.matchMedia();

        media.add(
            {
                desktop: '(min-width: 641px)',
                mobile: '(max-width: 640px)',
                reduce: '(prefers-reduced-motion: reduce)',
            },
            (context) => {
                if (context.conditions?.reduce || useReducedEffects()) return;
                const desktop = context.conditions?.desktop;
                const distance = desktop ? 28 : 18;
                const reveals = new Map<HTMLElement, gsap.core.Tween>();

                // Never hide content that has already painted in the first viewport.
                scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
                    if (initiallyVisible.has(element) || aboveViewport.has(element)) return;
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
                        scrollTrigger: motionTrigger(element),
                    });
                    reveals.set(element, tween);
                });

                // Print the wordmark in place, then finish with its accent dot.
                const aboutMark = scope.querySelector('.about-page__mark');
                if (aboutMark && !initiallyVisible.has(aboutMark) && !aboveViewport.has(aboutMark)) {
                    const letters = aboutMark.querySelectorAll('.about-page__letter');
                    const dot = aboutMark.querySelector('.about-page__dot');
                    const logo = gsap.timeline({
                        scrollTrigger: motionTrigger(aboutMark, { start: 'clamp(top 40%)' }),
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
                const heroHeading = scope.querySelector('.home-hero__heading');
                if (lines.length && heroHeading && !initiallyVisible.has(heroHeading) && !aboveViewport.has(heroHeading)) {
                    gsap.fromTo(lines, { yPercent: 115, rotation: 1.5 }, {
                        yPercent: 0,
                        rotation: 0,
                        duration: 1.2,
                        stagger: 0.14,
                        ease: 'power4.out',
                        clearProps: 'transform',
                        scrollTrigger: motionTrigger(heroHeading),
                    });
                }

                scope.querySelectorAll<HTMLElement>('.home-stats > div, .home-process__step, .home-works__more').forEach((element) => {
                    gsap.fromTo(element, { '--rule-progress': 0 }, {
                        '--rule-progress': 1,
                        duration: 1.2,
                        ease: 'power3.inOut',
                        scrollTrigger: motionTrigger(element),
                    });
                });

                scope.querySelectorAll('.home-about__statement strong').forEach((element) => {
                    gsap.fromTo(element, { '--ink-progress': '0%' }, {
                        '--ink-progress': '100%',
                        duration: 0.85,
                        ease: 'none',
                        scrollTrigger: motionTrigger(element, { end: 'clamp(bottom 30%)', scrub: 0.5 }),
                    });
                });

                scope.querySelectorAll('.home-stats strong').forEach((element) => {
                    if (initiallyVisible.has(element) || aboveViewport.has(element)) return;
                    gsap.fromTo(element, { rotationX: -25, y: 16, opacity: 0, transformOrigin: 'center bottom', transformPerspective: 600 }, {
                        rotationX: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power3.out',
                        clearProps: 'transform,transformOrigin,opacity',
                        scrollTrigger: motionTrigger(element),
                    });
                });

                // Keep mobile scrolling direct; reserve the deeper image motion for wide layouts.
                if (desktop) {
                    const hero = scope.querySelector('.home-hero');
                    if (hero) {
                        gsap.to(scope.querySelectorAll('.home-hero__line'), {
                            xPercent: (index) => index === 0 ? 1.5 : 3,
                            duration: 0.85,
                            ease: 'none',
                            scrollTrigger: motionTrigger(hero, { end: 'clamp(bottom top)', scrub: 0.7 }),
                        });
                    }
                    const footerTitle = scope.querySelector('.portfolio-footer__title a');
                    if (footerTitle?.parentElement) gsap.fromTo(footerTitle, { y: 18 }, {
                        y: 0,
                        duration: 0.85,
                        ease: 'none',
                        scrollTrigger: motionTrigger(footerTitle.parentElement, { end: 'clamp(top 30%)', scrub: 0.7 }),
                    });
                    scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((element) => {
                        const target = element.querySelector('.project-mockup');
                        if (!target) return;
                        gsap.fromTo(target, { yPercent: 2 }, {
                            yPercent: -2,
                            duration: 0.85,
                            ease: 'none',
                            scrollTrigger: motionTrigger(element, { end: 'clamp(bottom top)', scrub: 0.8 }),
                        });
                    });
                    const statement = scope.querySelector('.home-process__lead > span');
                    if (statement) gsap.fromTo(statement, { x: 24 }, {
                        x: 0,
                        duration: 0.85,
                        ease: 'none',
                        scrollTrigger: motionTrigger(statement, { end: 'clamp(top 30%)', scrub: 0.6 }),
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
                };
            },
            scope,
        );

        // Images, locale changes and expanding content can change trigger positions.
        let frame = 0;
        const refresh = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                if (!unmounted) ScrollTrigger.refresh(true);
            });
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
