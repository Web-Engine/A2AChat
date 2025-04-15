/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgentService {
    /**
     * Agent 목록 조회
     * @returns Agent Agent 목록
     * @throws ApiError
     */
    public static listAgents(): CancelablePromise<Array<Agent>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agents',
            errors: {
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
            },
        });
    }
    /**
     * Agent 생성
     * @param requestBody
     * @returns Agent 생성된 Agent 정보
     * @throws ApiError
     */
    public static createAgent(
        requestBody: {
            name?: string;
            description?: string;
        },
    ): CancelablePromise<Agent> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/agents',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `잘못된 요청`,
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
            },
        });
    }
    /**
     * Agent 상세 정보 조회
     * @param agentId
     * @returns Agent Agent 상세 정보
     * @throws ApiError
     */
    public static getAgent(
        agentId: string,
    ): CancelablePromise<Agent> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agents/{agentId}',
            path: {
                'agentId': agentId,
            },
            errors: {
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `Agent를 찾을 수 없음`,
            },
        });
    }
    /**
     * Agent 정보 수정
     * @param agentId
     * @param requestBody
     * @returns Agent 수정된 Agent 정보
     * @throws ApiError
     */
    public static updateAgent(
        agentId: string,
        requestBody: {
            name?: string;
            description?: string;
        },
    ): CancelablePromise<Agent> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/agents/{agentId}',
            path: {
                'agentId': agentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `잘못된 요청`,
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `Agent를 찾을 수 없음`,
            },
        });
    }
    /**
     * Agent 삭제
     * @param agentId
     * @returns void
     * @throws ApiError
     */
    public static deleteAgent(
        agentId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/agents/{agentId}',
            path: {
                'agentId': agentId,
            },
            errors: {
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `Agent를 찾을 수 없음`,
            },
        });
    }
}
