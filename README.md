# 🏠 카카오 홈즈 (Kakao Homes)

- FE: https://github.com/One-Kakao-Onboarding/kakao_hackathon_14_FE
- BE: https://github.com/One-Kakao-Onboarding/hackaton_14_be
- 데모 URL: https://kakaohackathon14fe.vercel.app/

**"상상을 확신으로, 1인 가구를 위한 초개인화 AI 인테리어"**

카카오 홈즈는 1인 가구를 위한 AI 기반 인테리어 디자인 플랫폼입니다. 사용자의 방 사진과 선호도를 결합하여 맞춤형 인테리어 디자인을 생성하고, 예산과 주거 형태에 맞는 가구를 추천하며, 친구들과 투표를 통해 최적의 디자인을 선택할 수 있습니다.

![카카오 홈즈](public/hero-banner.png)

## 📋 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [사용 방법](#-사용-방법)
- [핵심 기능 상세](#-핵심-기능-상세)
- [개발 가이드](#-개발-가이드)
- [배포](#-배포)
- [라이센스](#-라이센스)

## ✨ 주요 기능

### 🎨 AI 인테리어 생성

- **이미지 업로드**: 방 사진을 업로드하고 변경하고 싶은 영역을 직관적으로 선택
- **AI 분석 및 무드 추천**: 업로드된 이미지를 분석하여 최적의 인테리어 스타일 추천
- **Before/After 비교**: 슬라이더를 통한 원본과 AI 생성 이미지의 실시간 비교
- **프로젝트 저장**: 생성된 디자인을 저장하고 나중에 다시 확인

### 🛋️ 맞춤형 상품 추천

- **주거 형태별 필터링**: 월세(무타공 제품), 전세(이동 가능한 가구), 자가(프리미엄 제품)에 맞춘 추천
- **예산 기반 필터링**: 설정한 예산 범위 내의 상품만 추천
- **스타일 매칭**: 선택한 인테리어 무드에 어울리는 가구 자동 추천
- **카카오 선물하기 연동**: 추천 상품을 카카오 선물하기로 바로 구매 가능

### 🗳️ 소셜 투표 시스템

- **디자인 투표**: 2개의 가구 옵션을 선택하여 친구들에게 투표 요청
- **투표 결과 시각화**: 실시간 투표 결과를 차트로 확인
- **URL 공유**: 고유 URL을 생성하여 카카오톡으로 간편하게 공유

### 📅 통합 배송 관리

- **이사일 카운트다운**: D-Day 위젯으로 이사 예정일까지 남은 날짜 확인
- **일괄 배송 예약**: 선택한 가구들을 이사일에 맞춰 한 번에 배송 예약

## 🛠 기술 스택

### Frontend

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

### Backend Integration

- **AI Engine API**: 이미지 분석 및 인테리어 생성 (Express 서버)
- **데이터 저장**: LocalStorage (투표, 프로젝트)

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint
- **Code Formatting**: Prettier (via Next.js)

## 📁 프로젝트 구조

```
kakao_hackathon_14_FE/
├── public/                          # 정적 파일
│   ├── hero-banner.png             # 히어로 배너 이미지
│   └── tutorial-*.png              # 튜토리얼 이미지
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # 루트 레이아웃 (Header, TabNavigation)
│   │   ├── page.tsx                # 홈 페이지 (메인 화면)
│   │   └── globals.css             # 글로벌 스타일
│   ├── components/                 # React 컴포넌트
│   │   ├── Header.tsx              # 상단 헤더 (검색, 장바구니, 사용자)
│   │   ├── TabNavigation.tsx       # 탭 네비게이션
│   │   ├── HeroSection.tsx         # 히어로 배너 섹션
│   │   ├── TutorialCarousel.tsx    # 튜토리얼 캐러셀
│   │   ├── SectionFilter.tsx       # 섹션 필터 (스크롤 네비게이션)
│   │   ├── VoteModal.tsx           # 투표 공유 모달
│   │   ├── VotingPage.tsx          # 투표 참여 페이지
│   │   ├── home/                   # 홈 관련 컴포넌트
│   │   │   ├── MyroomContainer.tsx # 내 방 컨테이너
│   │   │   ├── MychatList.tsx      # 프로젝트 목록
│   │   │   └── MychatItem.tsx      # 프로젝트 카드
│   │   └── sections/               # 주요 섹션 컴포넌트
│   │       ├── UploadSection.tsx   # 사진 업로드 섹션
│   │       ├── EditCanvas.tsx      # 이미지 편집 캔버스 (영역 선택)
│   │       ├── AIResultSection.tsx # AI 결과 섹션 (Before/After)
│   │       ├── ProductsSection.tsx # 상품 추천 섹션
│   │       ├── VotingSection.tsx   # 투표 섹션
│   │       └── ScheduleSection.tsx # 배송 일정 섹션
│   ├── features/                   # 비즈니스 로직
│   │   ├── ai-engine/
│   │   │   └── api.ts              # AI 인테리어 생성 API
│   │   ├── vote-system.ts          # 투표 시스템 로직
│   │   ├── mock-products.ts        # 상품 데이터 및 추천 로직
│   │   ├── project-storage.ts      # 프로젝트 저장 로직
│   │   └── kakao-products.json     # 카카오 선물하기 상품 데이터
│   ├── store/
│   │   └── useUserStore.ts         # Zustand 전역 상태 관리
│   └── lib/
│       └── api/
│           └── ai-engine.ts        # AI Engine API 클라이언트
├── CLAUDE.md                        # Claude Code 프로젝트 가이드
├── GUIDE.md                         # 개발 가이드
├── DEMO_SCRIPT.txt                  # 데모 시나리오
├── package.json                     # 프로젝트 의존성
├── tsconfig.json                    # TypeScript 설정
├── tailwind.config.ts               # Tailwind CSS 설정
└── next.config.mjs                  # Next.js 설정
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 9.x 이상

### 설치

1. 저장소 클론

```bash
git clone <repository-url>
cd kakao_hackathon_14_FE
```

2. 의존성 설치

```bash
npm install
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### AI 백엔드 서버 설정 (선택사항)

AI 인테리어 생성 기능을 사용하려면 백엔드 서버가 필요합니다:

1. 백엔드 서버가 `http://localhost:3001`에서 실행 중이어야 합니다
2. API 엔드포인트: `POST /api/ai-interior`
3. 상세 내용은 `src/features/ai-engine/api.ts` 참조

## 📖 사용 방법

### 1. 방 사진 업로드

1. 메인 화면의 "내 방 사진 업로드" 섹션에서 사진 선택
2. JPG, PNG 파일 (최대 10MB) 업로드
3. "영역 선택하기" 버튼 클릭

### 2. 변경 영역 선택

1. 캔버스에서 변경하고 싶은 영역에 동그라미 그리기
2. 여러 영역 선택 가능 (Shift + 클릭으로 추가 선택)
3. "완료" 버튼을 눌러 저장

### 3. AI 인테리어 생성

1. AI가 자동으로 이미지를 분석하고 무드를 추천
2. 추천된 스타일을 확인하고 원하는 무드 선택
3. 주거 형태 선택 (월세/전세/자가)
4. "AI 인테리어 생성하기" 버튼 클릭
5. 생성된 결과를 슬라이더로 확인

### 4. 상품 추천 및 투표

1. "AI 추천 상품 보기" 버튼 클릭
2. 추천된 가구 중 2개 선택
3. "친구들에게 투표 올리기" 버튼으로 투표 생성
4. 생성된 URL을 복사하여 카카오톡으로 공유

### 5. 프로젝트 저장

1. AI 결과 화면에서 "프로젝트 저장하기" 버튼 클릭
2. 저장된 프로젝트는 하단 "나의 프로젝트" 섹션에서 확인

## 🎯 핵심 기능 상세

### Zustand 전역 상태 관리

`src/store/useUserStore.ts`에서 애플리케이션의 모든 상태를 관리합니다:

```typescript
interface UserState {
  // 사용자 프로필
  nickname: string;
  moods: string[]; // 선호 스타일 (modern, minimal 등)
  residenceType: string; // 주거 형태 (월세, 전세, 자가)
  budget: number; // 예산
  moveInDate: Date | null; // 이사 예정일

  // AI 캔버스
  uploadedRoomImg: string | null; // 업로드된 원본 이미지
  editedImage: string | null; // 편집된 이미지 (영역 표시)
  aiResultImg: string | null; // AI 생성 결과 이미지
  circles: Circle[]; // 선택된 영역 좌표
  canvasSize: { width: number; height: number } | null;

  // Actions
  setPersona: (data: Partial<UserState>) => void;
  setUploadedRoomImg: (img: string | null) => void;
  setAiResult: (img: string) => void;
  // ... 기타 액션들
}
```

### AI 인테리어 생성 플로우

1. **이미지 업로드** (`UploadSection.tsx`):

   - 파일 크기 검증 (최대 10MB)
   - Base64로 인코딩하여 Store에 저장

2. **영역 선택** (`EditCanvas.tsx`):

   - HTML Canvas API를 사용한 인터랙티브 드로잉
   - 동그라미 영역의 좌표와 반지름 저장

3. **AI 분석** (`AIResultSection.tsx`):

   - 이미지 자동 분석 및 무드 추천
   - 사용자가 무드와 주거 형태 선택

4. **AI 생성** (`src/features/ai-engine/api.ts`):

   - FormData로 이미지와 영역 정보를 서버에 전송
   - 서버에서 AI 모델로 새로운 인테리어 이미지 생성

5. **결과 시각화**:
   - Before/After 슬라이더로 비교
   - 상대 좌표를 절대 좌표로 변환하여 렌더링

### 투표 시스템

`src/features/vote-system.ts`에서 투표 생성 및 관리:

```typescript
// 투표 생성
const vote = createVote(userName, products, aiResultImage);

// 고유 URL 생성
const shareUrl = getShareUrl(vote.id); // ?vote=<voteId>

// 투표 참여
submitVote(voteId, voterName, selectedProductId);

// 투표 결과 조회
const results = getVoteResults(voteId);
```

투표 데이터는 LocalStorage에 저장되며, URL 파라미터를 통해 공유됩니다.

### 상품 추천 알고리즘

`src/features/mock-products.ts`의 `getRecommendedProducts` 함수:

1. **주거 형태 필터링**:

   - 월세: `removable: true` (무타공 제품)
   - 전세/자가: 모든 제품

2. **무드 매칭**:

   - 사용자가 선택한 무드와 상품의 `tags` 일치도 계산
   - 일치도 높은 순서로 정렬

3. **랜덤화**:
   - 동일한 일치도를 가진 상품들은 랜덤하게 섞어서 다양성 제공

## 🔧 개발 가이드

### 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

### 환경 변수

현재 프로젝트는 환경 변수를 사용하지 않습니다. AI 백엔드 서버 URL은 `src/features/ai-engine/api.ts`에 하드코딩되어 있습니다:

```typescript
const API_BASE_URL = "http://localhost:3001";
```

프로덕션 환경에서는 이를 환경 변수로 변경하는 것을 권장합니다.

### 코드 구조 가이드

1. **컴포넌트**: `src/components/`에 UI 컴포넌트 배치
2. **비즈니스 로직**: `src/features/`에 기능별로 분리
3. **전역 상태**: `src/store/`의 Zustand store 사용
4. **API 호출**: `src/lib/api/` 또는 `src/features/*/api.ts`에 배치

### 스타일링 가이드

- Tailwind CSS 유틸리티 클래스 사용
- 커스텀 스타일은 `src/app/globals.css`에 추가
- 카카오 선물하기 스타일 가이드를 따름 (헤더, 상품 카드 등)

## 📝 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 👥 팀

카카오 해커톤 14기 - 카카오 홈즈 팀

---

**Built with ❤️ for 1인 가구를 위한 더 나은 인테리어 경험**
