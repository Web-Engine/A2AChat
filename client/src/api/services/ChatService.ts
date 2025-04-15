/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatMessage } from '../models/ChatMessage';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatService {
    /**
     * Agent와 채팅
     * @param requestBody
     * @returns ChatMessage 채팅 응답
     * @throws ApiError
     */
    public static sendChatMessage(
        requestBody: {
            senderId?: string;
            receiverId?: string;
            content?: string;
        },
    ): CancelablePromise<ChatMessage> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/chat',
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
     * 채팅 기록 조회
     * @param agentId
     * @returns ChatMessage 채팅 기록 목록
     * @throws ApiError
     */
    public static getChatHistory(
        agentId: string,
    ): CancelablePromise<Array<ChatMessage>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/history',
            query: {
                'agentId': agentId,
            },
            errors: {
                400: `잘못된 요청`,
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `Agent를 찾을 수 없음`,
            },
        });
    }
}
