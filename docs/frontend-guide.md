# 프론트엔드 개발 가이드

## 기술 스택
- **프레임워크**: React
- **언어**: TypeScript
- **패키지 매니저**: pnpm
- **빌드 도구**: Vite
- **스타일링**: Tailwind

## 프로젝트 구조
```
client/
├── src/               # 소스 코드
│   ├── components/    # 컴포넌트
│   ├── pages/         # 페이지
│   ├── models/        # 데이터 모델
│   ├── hooks/         # 커스텀 훅
│   ├── assets/        # 정적 자원
│   ├── App.tsx        # 메인 앱 컴포넌트
│   └── main.tsx       # 앱 진입점
└── public/            # 정적 파일
```

## 공통 컴포넌트 가이드
- 가능한 한 공통 컴포넌트 사용
- 불필요한 스타일 커스터마이징 금지
- 새로운 컴포넌트는 필요할 때 자유롭게 추가 가능

## 코드 스타일
- ESLint와 Prettier 규칙 준수
- 함수형 컴포넌트 사용
- TypeScript 타입 명시
- 커밋 메시지는 Conventional Commits 규칙 준수
