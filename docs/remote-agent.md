# Remote Agent 구현 가이드

## Remote Agent란?

Remote Agent는 A2A (Agent-to-Agent) 프로토콜을 준수하는 외부 서버에 있는 에이전트입니다. 이 에이전트는 다른 에이전트나 클라이언트와 A2A 프로토콜을 통해 통신하며, 독립적인 AI 에이전트로서 기능합니다.

## A2A 프로토콜 개요

A2A 프로토콜은 Google에서 제안한 에이전트 간 통신을 위한 표준 프로토콜입니다. 주요 구성 요소는 다음과 같습니다:

1. **Agent Card**
   - 에이전트의 기능, 스킬, 엔드포인트 URL, 인증 요구사항을 설명하는 메타데이터
   - `/.well-known/agent.json` 경로에서 제공
   - JSON 형식으로 작성

2. **Task**
   - 작업의 기본 단위
   - 고유한 ID를 가짐
   - 상태: submitted, working, input-required, completed, failed, canceled

3. **Message**
   - 클라이언트와 에이전트 간의 통신 턴
   - role: "user" 또는 "agent"
   - Parts로 구성

4. **Part**
   - Message나 Artifact 내의 기본 콘텐츠 단위
   - TextPart, FilePart, DataPart 등

## 구현 단계

### 1. Agent Card 구현

```json
{
  "name": "에이전트 이름",
  "description": "에이전트 설명",
  "url": "에이전트 엔드포인트 URL",
  "version": "에이전트 버전",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true,
    "stateTransitionHistory": true
  },
  "authentication": {
    "schemes": ["bearer"],
    "credentials": null
  },
  "defaultInputModes": ["text"],
  "defaultOutputModes": ["text"],
  "skills": [
    {
      "id": "skill_id",
      "name": "스킬 이름",
      "description": "스킬 설명"
    }
  ]
}
```

### 2. API 엔드포인트 구현

#### 2.1 Task 관련 엔드포인트

- `POST /tasks/send`
  - 새로운 Task 생성
  - 요청 본문: 초기 메시지와 Task ID
  - 응답: Task 객체

- `POST /tasks/sendSubscribe`
  - Streaming 지원 Task 생성
  - Server-Sent Events (SSE)로 실시간 업데이트 제공

- `GET /tasks/{taskId}`
  - Task 상태 조회

- `POST /tasks/{taskId}/cancel`
  - Task 취소

#### 2.2 Push Notification 관련 엔드포인트

- `POST /tasks/pushNotification/set`
  - Push Notification 설정
  - webhook URL 등록

### 3. 메시지 처리

```typescript
interface Message {
  role: "user" | "agent";
  parts: Part[];
}

interface Part {
  type: "text" | "file" | "data";
  content: any;
}
```

### 4. 상태 관리

```typescript
enum TaskStatus {
  SUBMITTED = "submitted",
  WORKING = "working",
  INPUT_REQUIRED = "input-required",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELED = "canceled"
}
```

## 보안 고려사항

1. **인증**
   - Bearer 토큰 사용
   - API 키 관리

2. **암호화**
   - HTTPS 사용
   - 민감한 데이터 암호화

3. **접근 제어**
   - IP 기반 접근 제한
   - Rate limiting

## 테스트

1. **단위 테스트**
   - 각 엔드포인트의 기능 테스트
   - 메시지 처리 로직 테스트

2. **통합 테스트**
   - 다른 에이전트와의 통신 테스트
   - Streaming 및 Push Notification 테스트

3. **성능 테스트**
   - 동시 요청 처리 능력
   - 응답 시간

## 모니터링

1. **로그**
   - 요청/응답 로그
   - 에러 로그
   - 성능 로그

2. **메트릭**
   - 요청 수
   - 응답 시간
   - 에러율

3. **알림**
   - 에러 알림
   - 성능 저하 알림

## 배포

1. **환경 구성**
   - 개발 환경
   - 스테이징 환경
   - 프로덕션 환경

2. **CI/CD**
   - 자동화된 테스트
   - 자동화된 배포

3. **스케일링**
   - 수평적 스케일링
   - 로드 밸런싱

## 참고 자료

- [A2A 프로토콜 스펙](https://github.com/google/A2A)
- [A2A 샘플 코드](https://github.com/google/A2A/tree/main/samples)
- [A2A 문서](https://google.github.io/A2A/#/documentation) 