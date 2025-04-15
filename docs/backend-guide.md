# 백엔드 개발 가이드

## 기술 스택
- **프레임워크**: NestJS
- **언어**: TypeScript
- **패키지 매니저**: pnpm
- **데이터베이스**: MongoDB
- **ODM**: Mongoose

## 프로젝트 구조
```
server/
├── src/
│   ├── modules/        # 기능 모듈
│   ├── common/         # 공통 모듈
│   ├── config/         # 설정
│   ├── interfaces/     # 타입 정의
│   └── utils/          # 유틸리티 함수
├── test/               # 테스트 코드
└── ...                 # 설정 파일
```

## 데이터베이스 및 저장소
- MongoDB를 주요 데이터베이스로 사용합니다.
- 데이터 접근은 Mongoose(ODM)를 통해 Repository 패턴으로 구현합니다.
- 각 도메인별로 Entity, DTO, Repository, Service를 분리하여 관리합니다.

## 코드 스타일
- ESLint와 Prettier 규칙 준수
- NestJS 아키텍처 패턴 준수
- TypeScript 타입 명시
- 커밋 메시지는 Conventional Commits 규칙 준수

## API 설계
- RESTful API 설계 원칙 준수
- Swagger를 통한 API 문서화
- 적절한 HTTP 상태 코드 사용
- 에러 처리 표준화 