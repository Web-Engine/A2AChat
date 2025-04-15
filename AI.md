# A2A Chat 프로젝트 설명서

## 프로젝트 개요
A2A Chat은 Google의 A2A (Agent-to-Agent) Protocol을 기반으로 구축된 멀티 에이전트 채팅 플랫폼입니다. 이 프로젝트는 여러 AI 에이전트를 생성하고 관리하며, 이들 간의 상호작용을 가능하게 하는 웹 애플리케이션입니다.

## 프로젝트 목적
- Google의 A2A Protocol을 구현하여 에이전트 간 통신 표준을 확립
- 다중 AI 에이전트 시스템의 구축 및 관리 환경 제공
- 사용자와 AI 에이전트 간의 자연스러운 상호작용 구현
- 에이전트 간 협업을 통한 복잡한 문제 해결 능력 향상

## 기술 스택
### Backend (NestJS)
- **프레임워크**: NestJS
- **언어**: TypeScript
- **패키지 매니저**: pnpm
- **주요 기능**:
  - A2A Protocol 구현
  - 에이전트 관리 시스템
  - 실시간 통신 처리
  - API 엔드포인트 제공

### Frontend (React)
- **프레임워크**: React
- **언어**: TypeScript
- **빌드 도구**: Vite
- **주요 기능**:
  - 실시간 채팅 인터페이스
  - 에이전트 관리 대시보드
  - 사용자 상호작용 UI

## 프로젝트 구조
```
A2AChat/
├── server/          # NestJS 서버 애플리케이션
│   ├── src/         # 소스 코드
│   ├── test/        # 테스트 코드
│   └── ...          # 설정 파일
└── client/          # React 클라이언트 애플리케이션
    ├── src/         # 소스 코드
    ├── public/      # 정적 파일
    └── ...          # 설정 파일
```

## 주요 기능
1. **에이전트 관리**
   - 에이전트 생성 및 삭제
   - 에이전트 설정 관리
   - 에이전트 상태 모니터링

2. **에이전트 간 통신**
   - A2A Protocol 기반 메시지 교환
   - 실시간 데이터 동기화
   - 에이전트 간 협업 지원

3. **사용자 인터페이스**
   - 실시간 채팅 인터페이스
   - 에이전트 관리 대시보드
   - 사용자 설정 관리

4. **모니터링 및 분석**
   - 에이전트 성능 모니터링
   - 통신 로그 분석
   - 시스템 상태 확인

## 개발 환경 설정
1. **필수 조건**
   - Node.js (v18 이상)
   - pnpm
   - Git

2. **설치 및 실행**
   ```bash
   # 저장소 클론
   git clone [repository-url]
   cd A2AChat

   # 서버 실행
   cd server
   pnpm install
   pnpm run start:dev

   # 클라이언트 실행
   cd client
   pnpm install
   pnpm run dev
   ```

## 참고 자료
- [Google A2A Protocol 문서](https://developers.google.com/a2a)
- [NestJS 공식 문서](https://docs.nestjs.com/)
- [React 공식 문서](https://react.dev/)

## 라이센스
MIT License 