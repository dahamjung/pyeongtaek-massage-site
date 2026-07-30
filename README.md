# 평택출장마사지 정적 랜딩페이지

평택 전 지역 방문 케어의 서비스 범위, 코스·가격, 예약 방법을 모바일에서 빠르게 확인하도록 만든 단일 페이지 사이트입니다. 순수 HTML5, CSS3, 바닐라 JavaScript만 사용하며 모든 파일 경로는 GitHub Pages와 일반 정적 호스팅에서 동작하는 상대경로입니다.

## 사이트 구조

페이지 흐름은 `헤더 → 히어로 → 핵심 특징 → 코스·가격 → 서비스 → 지역 → 이용 장소 → 이용 절차 → 예약 전 안내 → FAQ → 최종 CTA → 푸터` 순서입니다. 첫 화면에는 방문 범위, 대표 가격, 예약 방식과 전화·문자 CTA를 배치했습니다.

## 파일 역할

- `index.html`: 페이지 콘텐츠, SEO 메타 태그, Organization·WebSite·Service·FAQPage JSON-LD
- `css/style.css`: 모바일 우선 레이아웃, 360px~데스크톱 반응형 디자인, 접근성 포커스 및 reduced-motion 처리
- `js/main.js`: 연락처 설정, 모바일 메뉴, FAQ 아코디언, CTA 이벤트, SEO URL과 JSON-LD 설정 동기화
- `images/hero.webp`: 첫 화면 우선 로딩 이미지, 1600×900
- `images/service-thai.webp`: 타이 코스 카드 이미지, 960×720
- `images/service-aroma.webp`: 아로마 코스 카드 이미지, 960×720
- `images/service-special.webp`: 스페셜 코스 카드 이미지, 960×720
- `favicon.svg`: 브라우저 탭과 앱 아이콘
- `manifest.webmanifest`: 설치형 웹앱 기본 정보와 테마 색상
- `robots.txt`: 검색엔진 크롤링 허용 및 사이트맵 위치
- `sitemap.xml`: 메인 URL 검색엔진 제출용 사이트맵

## 가장 먼저 수정할 설정

`js/main.js` 맨 위의 `SITE_CONFIG`를 실제 정보로 바꿉니다.

```js
const SITE_CONFIG = {
  phone: "0507-1859-8915",
  sms: "0507-1859-8915",
  smsMessage: "사이트 보고 문의드립니다:) ",
  businessName: "상호명 입력",
  domain: "https://ptvisitcare.kr/"
};
```

- 전화와 문자는 숫자·하이픈 형식 모두 사용할 수 있습니다.
- 문자 버튼을 누르면 `smsMessage`의 문구가 문자 앱에 미리 입력됩니다.
- `domain`은 JavaScript가 canonical, Open Graph, Twitter 이미지 URL과 JSON-LD의 URL에 반영합니다.
- 검색엔진이 JavaScript를 실행하지 않는 경우까지 대비하려면 `index.html`, `robots.txt`, `sitemap.xml`의 도메인도 함께 수정합니다.
- CSS 또는 JavaScript를 배포 후 수정하면 `index.html`의 `?v=20260723-2` 값을 올려 기존 브라우저 캐시를 갱신하세요.

## 가격과 콘텐츠 수정

- 가격: `index.html`에서 `price-list`를 검색해 각 시간과 금액을 수정합니다.
- 코스 설명: `price-card`와 `service-card`를 수정합니다.
- FAQ: 화면의 답변과 `structured-data` 내부 FAQ 답변을 항상 같은 내용으로 수정합니다.
- 사업자 정보: 푸터의 `TODO` 주석과 JSON-LD Organization을 실제 정보로 함께 수정합니다.
- LocalBusiness 또는 MassageTherapist 구조화 데이터는 실제 사업 형태, 주소, 영업시간이 확정된 뒤 추가하세요. 확인되지 않은 평점, 후기, 수상 정보는 넣지 않습니다.

## 로컬 확인

정적 서버의 문서 루트를 이 폴더로 지정해 실행합니다. 파일을 직접 열어도 대부분 동작하지만, manifest와 일부 브라우저 보안 정책까지 확인하려면 로컬 HTTP 서버를 권장합니다.

확인 항목:

1. 360px, 390px: 한 열 레이아웃, 햄버거 메뉴, 하단 고정 CTA, 가격표 줄바꿈
2. 768px: 2열 카드와 태블릿 여백
3. 1440px: 1180px 본문 폭, 데스크톱 메뉴, 3열 가격과 지역 카드
4. 키보드 Tab·Shift+Tab: 모든 링크와 버튼의 포커스 표시
5. Escape: 열린 모바일 메뉴 닫기
6. FAQ: 한 항목을 열면 기존에 열린 항목 닫기
7. 전화 `tel:`, 문자 `sms:` URL과 각 `data-action` 값
8. 브라우저 개발자 도구 Console 오류 유무

## CTA 이벤트 연결

모든 상담 버튼에는 아래 값 중 하나가 있습니다.

- `data-action="phone-click"`
- `data-action="sms-click"`

클릭 시 `site:cta-click` CustomEvent를 발생시킵니다. 페이지에 `window.dataLayer` 배열이 있으면 같은 action을 event 이름으로 push하므로, 향후 Google Tag Manager에서 수집할 수 있습니다. 코스 카드 버튼은 `course` 값도 함께 전달합니다.

## 하위 지역 페이지 추가

현재 다음 지역별 페이지가 연결되어 있습니다.

- `/godeok/`
- `/songtan/`
- `/sosabeol/`
- `/pyeongtaek-station/`
- `/anjung/`
- `/poseung/`
- `/paengseong/`
- `/oseong-jinwi/`

지역 페이지는 공통 디자인과 코스 정보를 사용하지만 title, meta description, canonical, H1, 생활권 본문과 FAQ는 지역별 고유 내용으로 구성했습니다. 새 지역을 추가할 때는 `scripts/generate-region-pages.mjs`의 지역 데이터와 메인 페이지 링크, `sitemap.xml`을 함께 갱신합니다.

## 배포

### GitHub Pages

저장소 루트에 이 파일 구조를 그대로 올리고 Pages의 배포 소스를 루트로 지정합니다. 프로젝트 하위 경로에서도 상대경로로 동작합니다. 한글 도메인은 DNS 설정 시 퓨니코드 `xn--hz2b29j7ogx9bb7g1wfu3f.kr`로 입력해야 할 수 있습니다.

현재 GitHub Pages 주소는 `https://ptvisitcare.kr/`입니다. 별도 도메인을 연결하면 `SITE_CONFIG.domain`, canonical, 구조화 데이터, `robots.txt`, `sitemap.xml`을 새 주소로 함께 교체합니다.

### 일반 정적 호스팅 / Cloudflare

빌드 명령 없이 폴더 전체를 업로드합니다. 문서 루트는 `index.html`이 있는 위치이며 출력 디렉터리도 현재 루트입니다. 도메인 연결 후 HTTPS가 정상 발급됐는지 확인하고 Search Console에 sitemap URL을 제출하세요.

## 배포 전 placeholder 체크리스트

- [x] `SITE_CONFIG.phone`: `0507-1859-8915`
- [x] `SITE_CONFIG.sms`: `0507-1859-8915`
- [x] `SITE_CONFIG.smsMessage`: `사이트 보고 문의드립니다:) `
- [ ] `SITE_CONFIG.businessName`: 실제 상호명
- [ ] 푸터 대표자명, 주소, 연락처
- [ ] 개인정보처리방침 전문과 개인정보 책임자·문의처
- [ ] 이용약관, 예약 변경·취소 및 결제 기준
- [ ] 상담 24시간, 방문 범위, 선입금 없음 등 실제 운영 조건 확인
- [ ] 가능한 결제 수단과 외곽 지역 추가 비용 기준
- [ ] JSON-LD Organization의 상호명, 전화번호, 주소
- [ ] 실제 도메인이 다를 경우 canonical, OG, robots.txt, sitemap.xml
- [ ] 실제 운영 형태가 확정된 경우에만 LocalBusiness 계열 구조화 데이터 추가

실제 후기, 관리사 개인정보, 인증·수상·평점은 확인 가능한 자료가 있을 때만 추가하세요.
