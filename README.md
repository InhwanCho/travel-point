# Travel-Point의 웹 프론트

## 실행 방법

```bash
# 먼저 node.js가 설치 되어 있어야 됩니다.
# 로컬에서 실행 순서
# 1. `.env.local` 파일 설정
# 2. 아래 명령어 실행
npm install
npm run dev
```

## 배포

배포 주소 : [travel-point 사이트](https://travel-point-umber.vercel.app/ "travel-point")

- `Next.js`
- `TypeScript`
- `Tailwindcss`
- `React-query`
- `Zustand`

## 폴더 구조

```text
root
├── public
├── prisma
└── src
    ├── app # 앱라우트
    │   ├── @modal
    │   ├── api
    │   ├── auth
    │   ├── destinations
    │   │   └── [slug]
    │   ├── festivals
    │   │   └── [slug]
    │   ├── mypage
    │   ├── recommended
    │   ├── regions
    │   └── themes
    ├── assets
    ├── components
    ├── config
    ├── context
    ├── data
    ├── hooks
    ├── libs
    ├── services
    ├── store
    ├── styles
    └── types
```

## 환경 변수 설정

```text:.env
# .env | .env.local
# BASE_URL
NEXT_PUBLIC_API_BASE_URL=

# naver blog search api
NEXT_PUBLIC_NAVER_SEARCH_ID=
NEXT_PUBLIC_NAVER_SEARCH_KEY=

# kakao api
NEXT_PUBLIC_KAKAO_ID=
NEXT_PUBLIC_KAKAO_MAP_KEY=

# mysql - 관광데이터 id,ps
NEXT_PUBLIC_API_USERNAME=
NEXT_PUBLIC_API_PASSWORD=

# oauth github, google url
NEXT_PUBLIC_OAUTH_NAVER_URL=
NEXT_PUBLIC_OAUTH_GOOGLE_URL=

NEXT_PUBLIC_LOGIN_URL=
NEXT_PUBLIC_JOIN_URL=

NEXT_PUBLIC_CF_ID=
NEXT_PUBLIC_CF_TOKEN=
```

## 주요 기능

**반응형 디자인 및 모바일 지원**

- 반응형 웹사이트 설계로 다양한 기기에서 최적의 사용자 경험 제공.
- 모바일 환경에서는 `React Native` 기반의 **WebView**를 통해 **APK**로 배포.

**여행지 추천**

- **지역별**, **테마별** 여행지 추천 기능.
- **주변 여행지 추천**: 여행지의 위치 정보를 기반으로 인근 관광지 추천.
- **사용자 맞춤 추천**: 사용자 온보딩 및 **부루마블 게임**을 통해 맞춤형 랜덤 여행지 추천.

**회원가입 및 로그인**

- 이메일 인증을 통한 회원가입 및 로그인 구현.
- 병렬 라우팅과 `모달 창`을 사용한 간편한 회원 관리 UI 제공.
- `JWT`를 이용한 로그인 및 보안 관리.

**지도 및 블로그 리뷰**

- `kakaoMap` **,** `naverSearch` **API**를 활용해 여행지 지도와 블로그 리뷰 제공.

**여행지 북마크 및 최근 본 여행지**

- `localStorage`를 이용한 최근 본 여행지 저장 및 표시.
- 관심 여행지 **북마크** 기능.

**리뷰 관리**

- 여행지 리뷰 작성 및 사진 첨부 기능.
- 리뷰 정렬(최신순, 별점순) 및 좋아요 기능.
- 관리자 페이지에서 신고된 리뷰 관리.

**검색 기능**

- `kbar` 와 `pako`로 데이터를 압축한 검색 기능으로 성능 최적화.

**E2E 테스트**

- `cypress`를 이용해 전체 기능의 테스트 및 검증.
