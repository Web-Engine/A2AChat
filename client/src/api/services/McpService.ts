/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMcpDto } from '../models/CreateMcpDto';
import type { Mcp } from '../models/Mcp';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class McpService {
    /**
     * 모든 Mcp 설정 조회
     * @returns Mcp 성공
     * @throws ApiError
     */
    public static mcpsControllerFindAll(): CancelablePromise<Array<Mcp>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/mcps',
        });
    }
    /**
     * 새로운 Mcp 설정 생성
     * @param requestBody
     * @returns Mcp 생성 성공
     * @throws ApiError
     */
    public static mcpsControllerCreate(
        requestBody: CreateMcpDto,
    ): CancelablePromise<Mcp> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/mcps',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 특정 Mcp 설정 조회
     * @param id
     * @returns Mcp 성공
     * @throws ApiError
     */
    public static mcpsControllerFindOne(
        id: string,
    ): CancelablePromise<Mcp> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/mcps/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Mcp 설정이 존재하지 않음`,
            },
        });
    }
    /**
     * Mcp 설정 업데이트
     * @param id
     * @returns Mcp 업데이트 성공
     * @throws ApiError
     */
    public static mcpsControllerUpdate(
        id: string,
    ): CancelablePromise<Mcp> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/mcps/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Mcp 설정이 존재하지 않음`,
            },
        });
    }
    /**
     * Mcp 설정 삭제
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static mcpsControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/mcps/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Mcp 설정이 존재하지 않음`,
            },
        });
    }
}
