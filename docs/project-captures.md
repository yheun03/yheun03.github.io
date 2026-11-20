# 프로젝트 화면 관리

2026-11-19 공개 페이지에 직접 방문해 화면을 검수하고 캡처했다. 신규 원본은 각 프로젝트의 `captures/` 디렉터리에 WebP로 저장한다. `data/works/ko.json`과 `en.json`에서 `captures`, `captureLabels`, `mockup`을 함께 관리한다. `prepare:assets`가 반응형 이미지와 정적 JSON을 생성한다.

## 화면 선정

- 프레임워크: https://yheun03.github.io/framework/erp-dashboard, /framework/work-orders, /framework/demos/demo-button, /framework/kiosk/work-result. 소개용 랜딩 대신 대시보드, 작업지시 목록, 공통 UI 가이드, 현장 실적 등록을 선정했다. 인프라 표준화 내용은 이 프로젝트로 통합했다.
- Flight Shade: https://yheun03.github.io/flight-shade/. 경로 지도, 공항 입력과 좌석 추천 결과를 사용했다. 지도 타일이 나타난 상태를 확인했다.
- Planearby: https://yheun03.github.io/planearby/. 서비스가 제공하는 예시 데이터 화면을 사용했다. 위치 권한 없이도 확인할 수 있으며 캡션에 예시 데이터임을 명시했다.
- 2026 포트폴리오: https://yheun03.github.io/ver.2026/, /ver.2026/about, /ver.2026/projects/. 상세 페이지의 사이트 보기 링크와 같은 보관본을 캡처했다. 이전 디자인 시안과 인물 사진, 테마별 중복 이미지를 갤러리에서 제외했다.
- 신길교회 야구 선교단: https://yheun03.github.io/singil-bmc/, /singil-bmc/records. 홈과 타자 기록 표를 선정했다.
- 플라이티: https://yheun03.github.io/cloneFlighty/#/home, /cloneFlighty/#/passport. 지도 타일 및 아이콘 리소스 이미지 대신 실제 항공편 목록, 경로 지도, 패스포트 UI로 교체했다.
- 카카오톡 클론: https://yheun03.github.io/cloneKakaoTalk/, /cloneKakaoTalk/chat-list, /cloneKakaoTalk/chat. 친구 목록, 채팅 목록, 샘플 대화 화면을 캡처했다. 고정 폭 앱 특성에 맞춰 아이폰 목업을 사용한다.
- 2025 포트폴리오: https://yheun03.github.io/ver.2025/index.html. 현재 공개된 보관본 화면을 사용한다.
- 메이트메이트: https://yheun03.github.io/matemate/html/match/recommendation.html, /matemate/html/match/insertMyData.html. 페이지 목록과 테스트 배너가 있는 메인 대신 추천 목록과 입력 폼을 사용했다.
- 조앤소프트 홈페이지: https://jonsoft.co.kr/, /business. 홈과 솔루션 소개를 사용했다. 별도의 2022 아카이브 프로젝트는 현재 홈페이지와 시점이 다르므로 기존 자료를 유지했다.

## 기존 자료 유지와 제외

공팅은 공개 저장소에서 실제 HTML 경로를 확인하고 https://yheun03.github.io/gongting/html/match/result.html, /gongting/html/user/profile.html, /gongting/html/match/match.html에서 매칭 결과, 내 프로필, 매칭 조건 선택 화면 3장을 새로 캡처했다.

외부 공개 주소가 없는 업무 시스템은 접근 여부를 임의로 추정하지 않고 기존 공개용 자료를 유지했다. TOS는 로그인 화면을 제외하고 업무 목록과 입력 폼을 사용한다. TOMS는 로그인, 유사 목록과 상세 중복 화면을 제외하고 목록, 입력, 상세, 배차 화면으로 줄였다. 기존 자료에 적용된 비식별 처리도 유지했다.

## 목업

목록과 상세는 `ProjectDeviceMockup.vue`를 공통으로 사용한다. 실제 기기별 캡처가 있는 경우 `mockup.desktop`, `mockup.tablet`, `mockup.mobile`을 연결한다. PC 화면을 모바일 화면처럼 잘라 재사용하지 않는다. 단일 캡처는 이미지별 `captureDevices` 설정과 기존 `mockup` 연결을 우선하며, 기기가 명시된 파일명을 제외한 일반 캡처는 PC를 기본값으로 사용한다. PC 전체 페이지 캡처를 모바일로 오인하지 않도록 세로 길이로 기기를 추정하지 않는다. 태블릿은 가로와 세로 비율을 구분한다. 목업은 Bunlong Heng Frames의 실제 MacBook Air, iPad Pro, iPhone 투명 PNG를 사용한다. CSS는 기기 배치와 실제 화면 좌표에만 사용하고, 사진 프레임을 화면 위에 겹쳐 카메라, 베젤, 모서리를 보존한다. 출처와 MIT 라이선스는 `assets/images/devices/LICENSE.txt`에 보관한다.

기존 `/projects/infra/`와 `/portfolio/projects/infra/`는 `/projects/framework/`로 연결된다. `public/ver.2026/`은 고정 보관본이므로 내부 콘텐츠를 수정하지 않는다.

## 라이트 모드와 화면 모서리

공개 사이트에서 재캡처할 수 있는 39장을 각 목업의 실제 화면 비율에 맞춰 다시 캡처했다. 카카오톡 클론 3장은 다크 단일 디자인으로, 나머지는 라이트 모드로 캡처했다. 과거 실무 원본과 비공개 안내 등 기존 자료 51개는 변경하지 않았다. 크기와 배율 기준은 [목업별 캡처 크기](device-capture-sizes.md)에 정리했다.

기기 프레임 안에 둥근 모서리와 `overflow: hidden`을 가진 화면 전용 영역을 두어, 흰색 화면이 베젤의 둥근 모서리 밖으로 드러나지 않도록 처리한다.

## 캡처 수 기준

공개 화면 자료가 있는 프로젝트는 최소 2장 이상을 사용한다. 공팅은 매칭 결과, 프로필, 매칭 조건 선택 화면 3장으로 보완했다. 추가 원본이 없는 삼화 대시보드(공개 이미지 1장)와 공개 캡처가 없는 광장 파트너스, 하마 앱, TMS 운영, 인천대 프로젝트는 기존 공개 범위를 유지한다. 같은 이미지를 복제해 수량을 채우지 않는다.

사용자 확인에 따라 광장 파트너스, 하마 앱, 인천대 공과대학은 오래된 프로젝트라 보관 자료가 없다는 안내를, TMS 운영은 보안상 공개할 수 없다는 안내를 목록과 상세에 각각 표시한다. 한영 데이터와 정적 JSON, SSR 응답에 동일하게 반영한다.
