# A2A Chat


## Summary
A2A Chat은 A2A(Agent to Agent protocol) 기반의 Multi-Agent 플랫폼입니다.


## 기능

### Local Agent
단 한 줄의 코드 작성 없이, Agent를 생성할 수 있습니다.

- Instruction을 작성하여 Agent가 어떤 업무를 수행해야 하는지 정의합니다.
- MCP 도구를 추가하여 Agent가 외부와 통신 할 수 있도록 설정합니다.
- Agent의 성능을 위해 사전지식을 추가할 수 있습니다.
- 다른 Agent들을 호출 할 수 있도록 설정할 수 있습니다.
- Local Agent를 다른 Multi-Agent 플랫폼에서 활용할 수 있도록 A2A Protocol로 제공합니다.

### Remote Agent
A2A Protocol로 제공되는 외부 Agent를 추가합니다.  
단순히 Endpoint 주소를 등록하는 것만으로 추가가 가능합니다.

- Basic, Bearer 등 다양한 인증 방식을 지원합니다.
- Remote Agent에 대한 인증을 A2A Chat API 인증으로 교체하는 Proxy 서버를 제공합니다.

### Device Agent Provider
A2A Chat은 서버에서 동작하는 솔루션으로 설계되어 있습니다.  
그러나, 사용자의 컴퓨터에서 동작하는 Agent를 A2A Chat으로 통합하고 싶을 수 있습니다.  

기본적으로 사용자의 컴퓨터에서 동작하는 Agent는 Remote Agent로 등록하기 까다롭습니다.
Device Agent Provider를 설치하면 사용자 컴퓨터에서 동작하는 Agent를 A2A Chat의 Remote Agent에 쉽게 추가할 수 있습니다.

### Agent Task Management
- 정해진 시간에 Agent가 동작하도록 설정 할 수 있습니다.
- Agent가 동작하도록 설정하는 Webhook을 생성 할 수 있습니다.

### MCP Management
Local Agent에 제공할 수 있는 MCP들을 관리할 수 있습니다.

### MCP Marketplace
Local Agent에 다양한 MCP를 손쉽게 설치 할 수 있도록 Marketplace를 제공합니다.

### Agent Marketplace
다양한 Local/Remote Agent들을 찾아보고 사용할 수 있는 Marketplace를 제공합니다.


## Authentication
A2A Chat이 지원하는 인증 수단입니다.

### A2A UserName/Password
A2A Chat 자체 DB에 등록된 계정 정보로 인증을 수행합니다.  
현재, 다른 인증 수단은 지원되지 않으나 Google, LDAP, AD, Okta 등을 추가할 예정입니다.

### A2A API Key
A2A Chat 내에서 발급한 API Key를 통해 인증을 수행합니다.  
API Key에 접근 가능한 Agent를 설정 할 수 있습니다.
