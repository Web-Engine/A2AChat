/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { CreateAgentDto } from '../models/CreateAgentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgentService {
    /**
     * 모든 Agent 조회
     * @returns Agent 성공
     * @throws ApiError
     */
    public static agentsControllerFindAll(): CancelablePromise<Array<Agent>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agents',
        });
    }
    /**
     * 새로운 Agent 생성
     * @param requestBody
     * @returns Agent 생성 성공
     * @throws ApiError
     */
    public static agentsControllerCreate(
        requestBody: CreateAgentDto,
    ): CancelablePromise<Agent> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/agents',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 특정 Agent 조회
     * @param id
     * @returns Agent 성공
     * @throws ApiError
     */
    public static agentsControllerFindOne(
        id: string,
    ): CancelablePromise<Agent> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agents/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Agent가 존재하지 않음`,
            },
        });
    }
    /**
     * Agent 정보 업데이트
     * @param id
     * @returns Agent 업데이트 성공
     * @throws ApiError
     */
    public static agentsControllerUpdate(
        id: string,
    ): CancelablePromise<Agent> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/agents/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Agent가 존재하지 않음`,
            },
        });
    }
    /**
     * Agent 삭제
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static agentsControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/agents/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Agent가 존재하지 않음`,
            },
        });
    }
}
