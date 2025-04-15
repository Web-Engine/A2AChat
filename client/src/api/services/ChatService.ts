/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatMessage } from '../models/ChatMessage';
import type { CreateChatMessageDto } from '../models/CreateChatMessageDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatService {
    /**
     * 모든 채팅 메시지 조회
     * @returns ChatMessage 성공
     * @throws ApiError
     */
    public static chatControllerFindAll(): CancelablePromise<Array<ChatMessage>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat',
        });
    }
    /**
     * 새로운 채팅 메시지 생성
     * @param requestBody
     * @returns ChatMessage 생성 성공
     * @throws ApiError
     */
    public static chatControllerCreate(
        requestBody: CreateChatMessageDto,
    ): CancelablePromise<ChatMessage> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/chat',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 특정 채팅 메시지 조회
     * @param id
     * @returns ChatMessage 성공
     * @throws ApiError
     */
    public static chatControllerFindOne(
        id: string,
    ): CancelablePromise<ChatMessage> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `메시지가 존재하지 않음`,
            },
        });
    }
    /**
     * 특정 Agent의 모든 채팅 메시지 조회
     * @param agentId
     * @returns ChatMessage 성공
     * @throws ApiError
     */
    public static chatControllerFindByAgentId(
        agentId: string,
    ): CancelablePromise<Array<ChatMessage>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/agent/{agentId}',
            path: {
                'agentId': agentId,
            },
        });
    }
    /**
     * 두 Agent 간의 대화 내용 조회
     * @param senderId
     * @param receiverId
     * @returns ChatMessage 성공
     * @throws ApiError
     */
    public static chatControllerFindConversation(
        senderId: string,
        receiverId: string,
    ): CancelablePromise<Array<ChatMessage>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/conversation',
            query: {
                'senderId': senderId,
                'receiverId': receiverId,
            },
        });
    }
}
