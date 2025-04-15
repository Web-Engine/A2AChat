# A2A Chat

A2A Chat은 Google의 A2A (Agent-to-Agent) Protocol을 기반으로 구축된 멀티 에이전트 채팅 플랫폼입니다. NestJS와 React를 사용하여 개발되었으며, 사용자가 여러 AI 에이전트를 생성하고 관리하며 상호작용할 수 있는 환경을 제공합니다.

## 프로젝트 개요

A2A Protocol은 Google에서 제안한 에이전트 간 통신을 위한 표준 프로토콜로, AI 에이전트들이 서로 협력하고 정보를 교환할 수 있는 프레임워크를 제공합니다. 이 프로젝트는 이러한 프로토콜을 구현하여:

- 다중 AI 에이전트 생성 및 관리
- 에이전트 간의 자동화된 협업
- 사용자와 에이전트 간의 자연스러운 상호작용
- 에이전트 성능 모니터링 및 최적화

를 가능하게 합니다.

## 프로젝트 구조

```
A2AChat/
├── server/          # NestJS 서버 애플리케이션
└── client/          # React 클라이언트 애플리케이션
```

## 기술 스택

### Backend
- NestJS
- TypeScript
- pnpm
- A2A Protocol 구현체

### Frontend
- React
- TypeScript
- Vite
- pnpm
- 실시간 채팅 인터페이스

## 시작하기

### 필수 조건
- Node.js (v18 이상)
- pnpm

### 설치 및 실행

1. 저장소 클론
```bash
git clone [repository-url]
cd A2AChat
```

2. 서버 실행
```bash
cd server
pnpm install
pnpm run start:dev
```

3. 클라이언트 실행
```bash
cd client
pnpm install
pnpm run dev
```

## 개발 가이드

### 서버 개발
- 서버는 `server` 디렉토리에서 개발합니다.
- NestJS의 모듈 기반 아키텍처를 따릅니다.
- A2A Protocol 표준을 준수하는 API를 구현합니다.
- API 문서는 Swagger를 통해 제공됩니다.

### 클라이언트 개발
- 클라이언트는 `client` 디렉토리에서 개발합니다.
- React의 함수형 컴포넌트와 Hooks를 사용합니다.
- Vite를 사용하여 빠른 개발 환경을 제공합니다.
- 실시간 채팅 인터페이스를 구현합니다.

## 주요 기능

- 에이전트 생성 및 관리
- 에이전트 간 통신 모니터링
- 사용자-에이전트 상호작용
- 에이전트 성능 분석
- 실시간 채팅 인터페이스

## 라이센스
MIT 

## 참고사항
이 프로젝트는 코드의 99%를 AI로 작성 중입니다.
