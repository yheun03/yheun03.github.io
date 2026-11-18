# 은영환 포트폴리오

웹 퍼블리셔 은영환의 경력과 프로젝트를 소개하는 개인 포트폴리오입니다.

**사이트:** [https://yheun03.github.io/](https://yheun03.github.io/)

## About Me

HTML과 SCSS를 중심으로 웹 UI를 구현해 온 7년차 웹 퍼블리셔입니다. 기업 홈페이지부터 스마트팩토리와 물류 시스템, 자사 솔루션까지 새로 만들고, 고쳐 만들고, 오래 운영해 봤습니다.

복잡한 요구사항을 사용자가 이해하기 쉬운 화면으로 정리하고, 동료가 나중에 고치기 쉬운 코드로 구현합니다. 현재는 Vue 3를 기반으로 컴포넌트와 상태 흐름을 다루며 프론트엔드 개발 역량을 넓히고 있습니다.

## Portfolio

- **Home** — 소개, 대표 프로젝트, 작업 방식과 기술 역량
- **Projects** — 기업 홈페이지와 업무 시스템 등 실무 프로젝트
- **Personal** — 직접 기획하고 구현한 개인 프로젝트
- **Journey** — 경력과 역할, 주요 경험을 시간순으로 정리한 이력
- **Highlights** — 수상, 자격, 활동과 주요 성과

프로젝트 상세 페이지에서는 작업 배경, 담당 역할, 사용 기술과 실제 화면을 확인할 수 있습니다.

## Skills

- HTML, SCSS, JavaScript
- Vue 3, Nuxt, Vite
- Axios, Pinia, Vue Router, i18n
- 반응형 웹 UI와 컴포넌트 설계
- 웹 접근성, 웹 표준, SEO
- Git, GitHub Pages

## Project

Nuxt 3와 Vue 3를 기반으로 제작한 정적 포트폴리오 사이트입니다. Node.js 20.19 이상 또는 22.12 이상의 지원 버전을 사용합니다.

프로젝트 원본은 `data/works/ko.json`과 `en.json`에서 관리합니다. `prepare:assets`가 목록 요약과 개별 프로젝트 JSON, 반응형 WebP 이미지, 사이트맵·RSS·`llms.txt`를 생성합니다. 생성된 JSON과 이미지는 Git에 포함하지 않으며 `dev`, `generate`, `postinstall`에서 준비합니다.

화면에서는 `useAsyncData`로 필요한 목록 또는 한 프로젝트만 읽고 Nuxt의 정적 payload를 재사용합니다. 새 이미지에는 `BaseMediaImage`와 실제 표시 크기에 맞는 `sizes`를 사용합니다. 첫 화면의 핵심 이미지에만 `priority`를 지정합니다. 홈·소개·경력·갤러리 스타일은 해당 화면에서 불러오고 공통 SCSS에는 실제 공통 요소만 둡니다.

```bash
npm install
npm run dev
```

```bash
npm run generate
npm run check:site
npm run deploy
```

공개 이력서는 [`RESUME.md`](RESUME.md)에서 확인할 수 있으며, 2025년 포트폴리오는 `public/ver.2025/`에 보관되어 있습니다.

## 2026 초기 버전 보관

기존 main 커밋 `6c47ccc7182529e466410058f91d7e8cfe00467d`의 정적 빌드를 `public/ver.2026/`에 보관합니다. `/personal/portfolio-2026/` 상세 페이지에서 `/ver.2026/index.html`을 열 수 있습니다. 일반 빌드에서 다시 렌더링하지 않는 고정 보관본이며 출처와 경로 조정 사항은 `public/ver.2026/archive.json`에 기록했습니다. 2025 버전은 기존 `/ver.2025/` 주소를 사용합니다.

## GitHub Pages 검색 설정

`public/`의 `sitemap.xml`, `sitemap.txt`, `rss.xml`, `robots.txt`는 빌드 후 사이트 루트에 배포됩니다. `robots.txt`는 전체 공개 URL을 담은 XML 사이트맵과 최근 콘텐츠를 담은 RSS 2.0 피드를 안내합니다. 프로젝트를 추가하면 빌드 시 공개 URL과 검색 리소스를 자동 갱신합니다. 고정 페이지를 추가할 때는 `scripts/generate-search-assets.mjs`의 페이지 목록을 수정합니다. 실제로 콘텐츠를 수정한 날짜만 수정일로 기록합니다. 컴포넌트·디자인 토큰 데모는 `noindex`로 유지합니다.

Nuxt에서 생성한 정적 파일을 그대로 제공하도록 `public/.nojekyll`을 포함합니다. `npm run deploy`도 `--nojekyll` 옵션으로 `gh-pages` 브랜치에 배포합니다. GitHub Pages의 배포 소스는 `gh-pages` 브랜치의 루트(`/`)를 사용합니다. GitHub Pages에서는 `public/_headers`로 응답 헤더를 바꿀 수 없으며, XML과 텍스트 파일의 Content-Type은 호스팅 서버가 확장자에 맞춰 제공합니다.

배포 후 Google Search Console의 `https://yheun03.github.io/` 속성에서 `sitemap.xml`과 `rss.xml`을 제출합니다. `sitemap.txt`는 같은 공개 URL의 텍스트 목록이므로 선택적으로 제출할 수 있습니다.

`가져올 수 없음`이 표시되면 해당 파일의 URL을 `URL 검사 → 실제 URL 테스트`로 확인합니다. `크롤링 허용 여부: 예`, `페이지 가져오기: 성공`이면 검사 시점에는 Google이 파일에 접근할 수 있습니다. 실시간 검사와 Sitemaps 보고서의 처리 결과는 별개이므로 파일 자체의 검색 색인 생성을 요청하지 않고, 사이트맵을 다시 제출한 뒤 보고서의 마지막 읽은 날짜와 상태를 확인합니다.

- [Google 사이트맵 작성 및 제출 안내](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Sitemaps 보고서와 가져오기 오류 안내](https://support.google.com/webmasters/answer/7451001?hl=ko)
- [GitHub Pages 정적 파일 및 MIME 유형 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
