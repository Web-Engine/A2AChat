# Build stage
FROM node:18-alpine AS builder

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 소스 코드 복사
COPY package.json pnpm-lock.yaml ./
COPY . .

# 의존성 설치 및 빌드
RUN pnpm install
RUN pnpm build

# Production stage
FROM node:18-alpine

WORKDIR /app

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

# 빌드된 파일과 필요한 파일들만 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# 프로덕션 의존성만 설치
RUN pnpm install --prod

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "dist/main"] 