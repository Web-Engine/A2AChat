/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Schedule = {
    /**
     * 예약 실행의 고유 식별자
     */
    id: string;
    /**
     * 실행할 Agent의 ID
     */
    agentId: string;
    /**
     * 실행 주기를 나타내는 Cron 표현식
     */
    cronExpression: string;
    /**
     * 예약 실행에 대한 설명
     */
    description?: string;
    /**
     * 예약 실행 활성화 여부
     */
    enabled?: boolean;
};

