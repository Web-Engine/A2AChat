/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateScheduleDto } from '../models/CreateScheduleDto';
import type { Schedule } from '../models/Schedule';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScheduleService {
    /**
     * 모든 예약 실행 조회
     * @returns Schedule 성공
     * @throws ApiError
     */
    public static schedulesControllerFindAll(): CancelablePromise<Array<Schedule>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedules',
        });
    }
    /**
     * 새로운 예약 실행 생성
     * @param requestBody
     * @returns Schedule 생성 성공
     * @throws ApiError
     */
    public static schedulesControllerCreate(
        requestBody: CreateScheduleDto,
    ): CancelablePromise<Schedule> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schedules',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 특정 예약 실행 조회
     * @param id
     * @returns Schedule 성공
     * @throws ApiError
     */
    public static schedulesControllerFindOne(
        id: string,
    ): CancelablePromise<Schedule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedules/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `예약 실행이 존재하지 않음`,
            },
        });
    }
    /**
     * 예약 실행 업데이트
     * @param id
     * @returns Schedule 업데이트 성공
     * @throws ApiError
     */
    public static schedulesControllerUpdate(
        id: string,
    ): CancelablePromise<Schedule> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/schedules/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `예약 실행이 존재하지 않음`,
            },
        });
    }
    /**
     * 예약 실행 삭제
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static schedulesControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/schedules/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `예약 실행이 존재하지 않음`,
            },
        });
    }
    /**
     * 특정 Agent의 모든 예약 실행 조회
     * @param agentId
     * @returns Schedule 성공
     * @throws ApiError
     */
    public static schedulesControllerFindByAgentId(
        agentId: string,
    ): CancelablePromise<Array<Schedule>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedules/agent/{agentId}',
            path: {
                'agentId': agentId,
            },
        });
    }
}
