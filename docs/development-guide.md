# 개발 가이드

## 프로젝트 개요
A2AChat은 AI 에이전트와의 대화를 지원하는 웹 애플리케이션입니다.

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

## 개발 가이드
- [프론트엔드 개발 가이드](./frontend-guide.md)
- [백엔드 개발 가이드](./backend-guide.md)

## 프로젝트 규칙
- 모든 코드는 TypeScript로 작성합니다.
- 코드 스타일은 ESLint와 Prettier를 따릅니다.
- 커밋 메시지는 Conventional Commits 규칙을 따릅니다.

## 문서화
- 모든 API는 Swagger를 통해 문서화합니다.
- 프로젝트의 상세한 설명은 index.md와 features.md를 참고하세요. 
