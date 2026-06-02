# Han-geureut Front

> Han-geureut Frontend는 React 기반의 음식 앨범·맛집 리뷰 공유 서비스 사용자 화면입니다. Han-geureut Backend에서 제공하는 API와 연동하여 인증, 앨범·리뷰 탐색, 검색 및 프로필 기능을 제공합니다.

---

## 📌 프로젝트 개요

Han-geureut Frontend는 음식 사진을 업로드하면 AI가 사진 속 음식과 분위기를 분석해 설명과 해시태그를 자동 생성하고,
사진의 메타데이터를 기반으로 장소와 시간 정보를 함께 기록해주는 음식 앨범 플랫폼입니다.
사용자의 음식 경험을 하나의 앨범으로 기록하고 다른 사람들과 공유할 수 있는 공간을 제공합니다.

---

## ✨ 주요 기능

- **인증/회원**
  - 일반 로그인/회원가입
  - 카카오, 구글 OAuth 로그인
  - 내 프로필 조회/수정
- **앨범**
  - 다단계 앨범 생성
  - 앨범 상세 조회
  - 좋아요/좋아요 취소
  - 유저별 앨범 목록 조회
- **리뷰**
  - 리뷰 목록 조회
  - 리뷰 상세 조회
  - 리뷰 작성/삭제
- **탐색/검색**
  - 키워드 기반 검색
  - 장소 상세 정보 조회
- **기록/템플릿**
  - 음식 기록 화면
  - 템플릿 기반 추억 보기

---

## 🛠 기술 스택

- **Core**: React 18, Create React App
- **Routing**: React Router DOM v6
- **Styling**: Styled Components
- **Animation**: Framer Motion
- **HTTP Client**: Axios, Fetch API
- **Map**: `@googlemaps/react-wrapper`, `@react-google-maps/api`
- **Test**: React Testing Library, Jest DOM

---

## 📂 폴더 구조

```text
src
├─ components       # 공통/도메인 UI 컴포넌트
├─ pages            # 라우팅 단위 페이지
├─ AlbumContext     # 앨범 생성 상태 관리
├─ useAuth          # 인증 관련 유틸/훅
├─ styles           # 전역 스타일
├─ App.js           # 라우트 정의
└─ index.js         # 앱 진입점
```

---

## 🔐 환경변수 설정

`.env.example`을 기준으로 `.env` 파일을 생성해 사용하세요.

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

`.env`에 아래 값을 설정하세요.

```bash
REACT_APP_API_URL=http://localhost:8080
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

주요 사용처:
- `REACT_APP_API_URL`: 백엔드 API 호출 기준 URL
- `REACT_APP_GOOGLE_MAPS_API_KEY`: 지도 렌더링 및 장소 표시

---

## 🚀 설치 및 실행

### 1) 레포지토리 클론

```bash
git clone https://github.com/Han-Geureut/Han-Geureut-Front
cd Han-Geureut-Front
```

### 2) 의존성 설치

```bash
npm install
```

### 3) 환경변수 파일 생성

```bash
cp .env.example .env
```

### 4) 개발 서버 실행

```bash
npm start
```

로컬 개발 서버는 기본적으로 [http://localhost:3000](http://localhost:3000) 에서 실행됩니다.

### 5) 프로덕션 빌드

```bash
npm run build
```

---

## ✅ 테스트

```bash
npm test
```

---

## 📡 API 연동 정보

- 기본 API 서버: `REACT_APP_API_URL` (예: `http://localhost:8080`)
- 인증 방식: JWT 토큰 기반
- OAuth 로그인: 백엔드 OAuth 엔드포인트(`/oauth2/authorization/*`) 연동

---

## 🧰 트러블슈팅

- `OAuth redirect_uri_mismatch`가 발생하면 OAuth Console의 Redirect URI와 백엔드 설정 URL을 동일하게 맞추세요.
- `CORS` 오류가 발생하면 백엔드 CORS 허용 도메인에 프론트 개발 주소(`http://localhost:3000`)가 포함되어 있는지 확인하세요.
- 지도가 표시되지 않으면 `REACT_APP_GOOGLE_MAPS_API_KEY` 값과 Google Maps API 활성화 상태를 확인하세요.

---

## 📎 함께 보면 좋은 참고 사항

- 백엔드 서버가 먼저 실행되어 있어야 정상 동작합니다.
- OAuth, 지도 API 키는 환경에 맞는 Redirect URI/도메인 설정이 필요합니다.
