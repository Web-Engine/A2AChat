/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Agent = {
    /**
     * Agent의 고유 식별자
     */
    id: string;
    /**
     * Agent 타입
     */
    type: Agent.type;
    /**
     * Agent의 이름
     */
    name: string;
    /**
     * Agent에 대한 설명
     */
    description?: string;
};
export namespace Agent {
    /**
     * Agent 타입
     */
    export enum type {
        LOCAL = 'Local',
        REMOTE = 'Remote',
    }
}

