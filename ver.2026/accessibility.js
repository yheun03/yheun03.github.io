// 원본 빌드를 유지하는 보관본에만 적용하는 접근성 보정.
function updateArchiveAccessibility() {
    for (const value of document.querySelectorAll('.base-stat-list dd[aria-label]')) {
        const label = value.getAttribute('aria-label');
        let text = value.querySelector('.visually-hidden');
        if (!text) {
            text = document.createElement('span');
            text.className = 'visually-hidden';
            value.append(text);
        }
        if (text.textContent !== label) text.textContent = label;
        value.removeAttribute('aria-label');
    }

    for (const card of document.querySelectorAll('.how__steps-card[aria-label]')) {
        if (card.getAttribute('role') !== 'group') card.setAttribute('role', 'group');
    }

    const brand = document.querySelector('.app-header__brand');
    if (brand) {
        const label = brand.getAttribute('aria-label') ?? '';
        const text = brand.textContent.trim().replace(/\s+/g, ' ');
        if (text && !label.startsWith(text)) {
            brand.setAttribute('aria-label', `${text}, ${label}`);
        }
    }
}

// 이 고정 Nuxt 빌드의 hydration이 끝나기 전에는 DOM을 수정하지 않는다.
const startupTime = performance.now();
function startArchiveAccessibility() {
    const app = document.getElementById('__nuxt')?.__vue_app__?.$nuxt;
    if (app?.isHydrating !== false) {
        if (performance.now() - startupTime < 30000) requestAnimationFrame(startArchiveAccessibility);
        return;
    }
    updateArchiveAccessibility();
    new MutationObserver(updateArchiveAccessibility).observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['aria-label'],
    });
}
startArchiveAccessibility();
