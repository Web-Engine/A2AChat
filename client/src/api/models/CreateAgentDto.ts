/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateAgentDto = {
    /**
     * Agent 타입
     */
    type: CreateAgentDto.type;
    /**
     * Agent의 이름
     */
    name: string;
    /**
     * Agent에 대한 설명
     */
    description?: string;
};
export namespace CreateAgentDto {
    /**
     * Agent 타입
     */
    export enum type {
        LOCAL = 'Local',
        REMOTE = 'Remote',
    }
}

