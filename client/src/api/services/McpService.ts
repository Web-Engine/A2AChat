/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MCPConfig } from '../models/MCPConfig';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class McpService {
    /**
     * MCP 목록 조회
     * @returns MCPConfig MCP 목록
     * @throws ApiError
     */
    public static listMcpConfigs(): CancelablePromise<Array<MCPConfig>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/mcps',
            errors: {
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
            },
        });
    }
    /**
     * MCP 추가(설치)
     * @param requestBody
     * @returns MCPConfig 추가된 MCP 정보
     * @throws ApiError
     */
    public static createMcpConfig(
        requestBody: MCPConfig,
    ): CancelablePromise<MCPConfig> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/mcps',
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
     * MCP 상세 정보 조회
     * @param mcpId
     * @returns MCPConfig MCP 상세 정보
     * @throws ApiError
     */
    public static getMcpConfig(
        mcpId: string,
    ): CancelablePromise<MCPConfig> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/mcps/{mcpId}',
            path: {
                'mcpId': mcpId,
            },
            errors: {
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `MCP를 찾을 수 없음`,
            },
        });
    }
    /**
     * MCP 정보 수정
     * @param mcpId
     * @param requestBody
     * @returns MCPConfig 수정된 MCP 정보
     * @throws ApiError
     */
    public static updateMcpConfig(
        mcpId: string,
        requestBody: MCPConfig,
    ): CancelablePromise<MCPConfig> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/mcps/{mcpId}',
            path: {
                'mcpId': mcpId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `잘못된 요청`,
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `MCP를 찾을 수 없음`,
            },
        });
    }
    /**
     * MCP 삭제
     * @param mcpId
     * @returns void
     * @throws ApiError
     */
    public static deleteMcpConfig(
        mcpId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/mcps/{mcpId}',
            path: {
                'mcpId': mcpId,
            },
            errors: {
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `MCP를 찾을 수 없음`,
            },
        });
    }
}
