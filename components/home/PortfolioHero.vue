<template>
    <section id="hello" class="home-hero" aria-labelledby="hero-title">
        <div class="home-hero__heading">
            <h1 id="hero-title">
                <span class="home-hero__line"><span class="home-hero__line-inner">YOUNGHWAN</span></span>
                <span class="home-hero__line"><span class="home-hero__line-inner">EUN</span></span>
            </h1>
        </div>
        <div class="home-hero__body">
            <NuxtLink
                to="/projects/framework"
                class="home-hero__visual"
                data-reveal="image"
                data-parallax
                :aria-label="copy('조앤소프트 프레임워크 프로젝트 보기', 'Explore the Jonsoft framework project')"
            >
                <ProjectDeviceMockup
                    src="/assets/images/projects/framework/captures/framework-dashboard.webp"
                    :alt="copy('조앤소프트 프레임워크 실제 화면', 'Jonsoft framework interface')"
                    sizes="(min-width: 641px) 44vw, 70vw"
                    priority
                />
                <span class="home-hero__visual-arrow" aria-hidden="true">↗</span>
            </NuxtLink>
            <div class="home-hero__intro" data-reveal="stagger">
                <p v-if="locale === 'ko'"><strong>디자인을 웹 화면으로 구현하는</strong> <span class="home-hero__role">웹 퍼블리셔</span> 은영환입니다.</p>
                <p v-else>
                    I’m Younghwan Eun, a <span class="home-hero__role">web publisher</span> who
                    <strong>turns designs into working interfaces.</strong>
                </p>
                <p>
                    {{
                        copy(
                            'HTML, SCSS, JavaScript와 Vue로 기업 홈페이지와 업무 시스템의 UI를 구현합니다.',
                            'I develop interfaces for corporate websites and business applications with HTML, SCSS, JavaScript and Vue.',
                        )
                    }}
                </p>
                <a class="home-text-link" href="#works">{{ copy('작업 보기', 'Explore my work') }} <span aria-hidden="true">↗</span></a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { locale } = useLocale();
const copy = (ko: string, en: string) => (locale.value === 'ko' ? ko : en);
</script>
