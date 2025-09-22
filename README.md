# re-earth-frontend

이 프로젝트는 React 기반 이커머스 프론트엔드입니다.  
팀원들이 각자의 기능을 브랜치에서 개발한 뒤, `develop` 브랜치로 병합하여 협업합니다.

---

## 1) 프로젝트 개요 (Introduction)

-  re-earth-frontend는 핀테크 기반 웹 프로젝트입니다.
-  React + Redux Toolkit 기반 SPA

## 2) 기술 스택 (Tech Stack)

-  Framework: React, Vite
-  State: Redux Toolkit, React-Redux
-  Routing: React Router
-  UI: MUI(Material UI), CSS Modules, Bootstrap
-  HTTP: Axios
-  Build: Vite, ESLint

## 3) 주요 기능 (Features)

-  로그인/회원가입
-  마이페이지
-  관리자 페이지(/admin으로 따로 치고 들아감)

## 4) 아키텍처 다이어그램

```bash
React(Vite) ↔ Axios ↔ Express API ↔ MySQL
        ↘ Redux Toolkit (global state)
```
🎨 [피그마 디자인](https://www.figma.com/design/ID3Xv1FVKKLLkShATsMbZc/Re-earth?node-id=1-3&p=f&t=2AdX5CuueWXUlT9p-0)
🗺️ [피그마 유저플로우](https://www.figma.com/board/0sSLFXCv2imiZmehWyHVJX/Re-Earth?node-id=0-1&p=f&t=i5jIedgo3uKCRvBr-0)

---
## 📁 re-earth-frontend(Frontend)

```bash
re-earth-frontend/
├─ node_modules/
├─ src/
│  ├─ api/              # 서버 통신 관련 함수 (axios, fetch 등 API 호출)
│  ├─ app/              # 전역 상태(store, 리듀서 등)와 앱 초기 설정
│  ├─ assets/           # 이미지, 폰트, 전역 스타일 등 정적 리소스
│  │  ├─ icons/         # 아이콘 파일
│  │  ├─ images/        # 이미지 리소스
│  │  └─ styles/        # 전역 스타일 시트
│  │     └─ commons.scss
│  │
│  ├─ components/       # 재사용 가능한 UI 컴포넌트
│  │  ├─ admin/         # 관리자 전용 컴포넌트
│  │  ├─ chat/          # 채팅 관련 컴포넌트
│  │  ├─ common/        # 공통 UI 컴포넌트 (버튼, 입력창 등)
│  │  ├─ layout/        # 레이아웃 컴포넌트 (헤더, 푸터, 사이드바 등)
│  │  ├─ main/          # 메인 페이지 구성 요소
│  │  ├─ map/           # 지도 관련 컴포넌트
│  │  ├─ modal/         # 모달 UI 컴포넌트
│  │  ├─ mypage/        # 마이페이지 관련 컴포넌트
│  │  ├─ point/         # 포인트 관련 컴포넌트
│  │  ├─ randing/       # 랜딩 페이지 관련 컴포넌트
│  │  ├─ shop/          # 포인트샵 관련 컴포넌트
│  │  └─ slide/         # 슬라이드/배너 컴포넌트
│  │
│  ├─ features/         # Redux slice 또는 특정 도메인별 상태/로직
│  ├─ hooks/            # 커스텀 훅 모음
│  │
│  ├─ pages/            # 주요 페이지 단위 컴포넌트
│  │  ├─ Admin/         # 관리자 페이지
│  │  ├─ chat/          # 채팅 페이지
│  │  ├─ market/        # 장터 페이지
│  │  ├─ public/        # 공용 페이지 (로그인, 회원가입 등)
│  │  └─ user/          # 일반 사용자 페이지
│  │
│  ├─ pages_extra/      # 보조 페이지(테스트/임시/서브 기능용)
│  │
│  ├─ routes/           # 라우팅 관련 정의
│  │  ├─ guards/        # 라우트 접근 제한 (권한별)
│  │  │  ├─ AdminOnly.jsx
│  │  │  ├─ GuestOnly.jsx
│  │  │  └─ UserOnly.jsx
│  │  └─ AppRouter.jsx  # 전체 라우팅 설정
│  │
│  └─ utils/            # 유틸 함수 모음
```
---
## 📦 Import 순서 가이드

> 코드 작성 시, 다음과 같은 순서로 import 문을 정렬해주세요. 각 그룹 사이에는 한 줄 공백을 추가합니다.

1. 외부 라이브러리

-  React, React Router, MUI(Material UI), Redux 등

```jsx
import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
```

2. 내부 유틸 / 전역 설정 / API 모듈

-  utils, hooks, context, api 등

```jsx
import { fetchPost } from '@/api/postApi'
import useAuth from '@/hooks/useAuth'
```

3. 컴포넌트

-  직접 만든 컴포넌트들 (공통 또는 특정 도메인 컴포넌트 포함)

```jsx
import Navbar from '../components/shared/Navbar'
import PostList from '../components/post/PostList'
```

4. 스타일 파일

-  css, scss, tailwind 등

```jsx
import '@/styles/common.css'
```

---

## 👥 브랜치 전략

-  `main`: 배포용
-  `develop`: 통합 개발 브랜치
-  `hcm` : 한창민
-  `jsy` : 정세연
-  `jse` : 정송이
-  `ysy` : 윤승영

> 모든 기능 개발은 **개별 브랜치에서 수행 후**,  
> 반드시 `develop` 브랜치 기준으로 **PR(Pull Request)** 을 생성해주세요.

---

## 🔀 브랜치 작업 및 Push 방법

### 1. 브랜치 최초 이동

```bash
git checkout -t origin/브랜치이름

# 예
git checkout -t origin/hcm

# 이후 작업할 때는
git checkout 브랜치이름

# 최초 Push 연결
git push --set-upstream origin 브랜치이름

# 이후부터는 그냥 git push 만 해도 됩니다.
```

---

## 🌿 신규 브랜치 생성 규칙

✅ 브랜치 전략은 협업의 중심입니다.
원활한 관리와 통합을 위해 가이드에 따라 작업해주세요 🙌

기능이 세분화되거나 테스트/임시 작업이 필요한 경우, 아래 규칙에 따라 **개별 브랜치에서 파생 브랜치**를 생성할 수 있습니다.

### ✅ 브랜치 네이밍 규칙

[이니셜]-[작업유형]-[기능이름]
예시:

-  `jsy-feat-popup` → 정세연 님이 팝업 기능 개발
-  `hcm-fix-login-bug` → 한창민 님이 로그인 버그 수정
-  `jse-test-api-token` → 정송이 님이 토큰 API 테스트

### ✅ 브랜치 생성 명령어

```bash
git checkout -b 본인지명-작업유형-기능명
git push -u origin 본인지명-작업유형-기능명
예:
git checkout -b jsy-feat-chat-ui
git push -u origin jsy-feat-chat-ui
```

> ❗ 브랜치를 새로 생성할 때는 팀 리더와 간단히 공유 후 작업해주세요.
> 작업 완료 후에는 develop 브랜치 기준으로 Pull Request를 생성합니다.

---

## ✍️ Git 커밋 메시지 작성 규칙

커밋 메시지는 형식과 내용을 명확하게 작성해야 협업 시 변경 내역을 빠르게 파악할 수 있습니다.
아래 형식을 따라 작성해주세요:

### ✅ 기본 형식

```bash
git commit -m "[태그] 작업한 내용 요약"

# 예:
git commit -m "[feat] 로그인 API 구현"
git commit -m "[fix] 장바구니 오류 수정"
git commit -m "[style] 버튼 정렬 개선"
```

---

### ✅ 커밋 태그 종류

| 태그       | 설명                                        |
| ---------- | ------------------------------------------- |
| `feat`     | 새로운 기능 추가                            |
| `patch`    | 간단한 수정 (줄바꿈, 줄추가, 정렬 등)       |
| `fix`      | 버그 수정                                   |
| `refactor` | 코드 리팩토링 (기능 변화 없음)              |
| `style`    | 스타일, 포맷팅, 주석 등 UI 외 변경          |
| `docs`     | 문서 (README 등) 변경                       |
| `test`     | 테스트 코드 추가/수정                       |
| `chore`    | 빌드, 패키지 매니저, 설정 파일 등 기타 작업 |
| `remove`   | 불필요한 코드/파일 제거                     |

---

### ✅ 커밋 메시지 팁

-  커밋 메시지는 **한 줄 요약**, 50자 이내 권장
-  작업 내용을 명확히 드러내는 동사를 사용
-  PR 리뷰자가 한눈에 파악할 수 있도록 작성

---

### 💬 예시

-  [feat] 상품 상세 페이지 레이아웃 구현
-  [fix] 로그인 실패 시 에러 메시지 표시
-  [refactor] useEffect 로직 정리
-  [style] ChartPage 컴포넌트 마진 조정
-  [test] orderSlice 테스트 코드 작성
-  [chore] ESLint 룰 추가 및 적용
-  [docs] README.md에 커밋 규칙 추가
