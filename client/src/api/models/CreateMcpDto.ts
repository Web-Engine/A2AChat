/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateMcpDto = {
    /**
     * MCP 타입
     */
    type: CreateMcpDto.type;
    /**
     * 실행할 명령어
     */
    command: string;
    /**
     * 명령어 인자 목록
     */
    args: Array<string>;
    /**
     * 실행 환경 변수
     */
    env: Record<string, string>;
    /**
     * MCP 이름
     */
    name: string;
    /**
     * MCP 설명
     */
    description?: string;
};
export namespace CreateMcpDto {
    /**
     * MCP 타입
     */
    export enum type {
        STDIO = 'stdio',
        SSE = 'sse',
    }
}

