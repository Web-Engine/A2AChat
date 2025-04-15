# OpenAPI 스펙 파일 네이밍 컨벤션

## 1. 기본 원칙

- 파일명은 API 경로와 최대한 유사하게 작성
- 하이픈(-)을 구분자로 사용
- 소문자만 사용
- 복수형/단수형 구분에 주의
- 경로 파라미터는 콜론(:)으로 명시적으로 표시

## 2. 파일명 패턴

### 2.1. 리소스 목록/생성 API
```
경로: /{리소스}
파일명: {리소스}.yaml

예시:
- /schedules -> schedules.yaml
- /agents -> agents.yaml
```

### 2.2. 개별 리소스 API
```
경로: /{리소스}/{id}
파일명: {리소스}-:{id}.yaml

예시:
- /schedules/{scheduleId} -> schedules-:scheduleId.yaml
- /agents/{agentId} -> agents-:agentId.yaml
- /mcp/{id} -> mcp-:id.yaml
```

### 2.3. 중첩된 리소스 API
```
경로: /{상위리소스}/{상위id}/{하위리소스}
파일명: {상위리소스}-:{상위id}-{하위리소스}.yaml

예시:
- /agents/{agentId}/configs -> agents-:agentId-configs.yaml
```

### 2.4. 중첩된 개별 리소스 API
```
경로: /{상위리소스}/{상위id}/{하위리소스}/{하위id}
파일명: {상위리소스}-:{상위id}-{하위리소스}-:{하위id}.yaml

예시:
- /agents/{agentId}/configs/{configId} -> agents-:agentId-configs-:configId.yaml
```

## 3. 태그 네이밍

- API 그룹을 나타내는 태그는 단수형 사용
- 첫 글자는 대문자, 나머지는 소문자
- 공백 없이 작성

예시:
```yaml
tags:
  - Agent    # agents.yaml, agents-:agentId.yaml
  - Schedule # schedules.yaml, schedules-:scheduleId.yaml
  - MCP      # mcps-configs.yaml, mcps-configs-:mcpId.yaml
```

## 4. 예시

### 4.1. Agent API
```
경로: /agents
파일명: agents.yaml
태그: Agent

경로: /agents/{agentId}
파일명: agents-:agentId.yaml
태그: Agent
```

### 4.2. MCP API
```
경로: /mcps/configs
파일명: mcps-configs.yaml
태그: MCP

경로: /mcps/configs/{mcpId}
파일명: mcps-configs-:mcpId.yaml
태그: MCP
```

### 4.3. Schedule API
```
경로: /schedules
파일명: schedules.yaml
태그: Schedule

경로: /schedules/{scheduleId}
파일명: schedules-:scheduleId.yaml
태그: Schedule
```

## 5. 주의사항

1. 파일명은 경로의 모든 세그먼트를 포함하되, 너무 길어지지 않도록 주의
2. 동일한 리소스에 대한 API는 동일한 태그 사용
3. 태그는 단수형으로 통일
4. 파일명은 소문자로 통일
5. 하이픈(-)을 구분자로 사용하여 가독성 확보
6. 경로 파라미터는 콜론(:)으로 명시적으로 표시 