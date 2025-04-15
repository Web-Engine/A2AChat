/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChatMessage = {
    /**
     * 메시지의 고유 식별자
     */
    id: string;
    /**
     * 메시지를 보낸 Agent의 ID
     */
    senderId: string;
    /**
     * 메시지를 받는 Agent의 ID
     */
    receiverId: string;
    /**
     * 메시지 내용
     */
    content: string;
    /**
     * 메시지 전송 시간
     */
    timestamp: string;
};

