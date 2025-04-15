/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Schedule } from '../models/Schedule';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScheduleService {
    /**
     * 예약 실행 목록 조회
     * @returns Schedule 예약 실행 목록
     * @throws ApiError
     */
    public static listSchedules(): CancelablePromise<Array<Schedule>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedules',
            errors: {
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
            },
        });
    }
    /**
     * 예약 실행 등록
     * @param requestBody
     * @returns Schedule 등록된 예약 실행 정보
     * @throws ApiError
     */
    public static createSchedule(
        requestBody: Schedule,
    ): CancelablePromise<Schedule> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schedules',
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
     * 예약 실행 상세 정보 조회
     * @param scheduleId
     * @returns Schedule 예약 실행 상세 정보
     * @throws ApiError
     */
    public static getSchedule(
        scheduleId: string,
    ): CancelablePromise<Schedule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedules/{scheduleId}',
            path: {
                'scheduleId': scheduleId,
            },
            errors: {
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `예약 실행을 찾을 수 없음`,
            },
        });
    }
    /**
     * 예약 실행 수정
     * @param scheduleId
     * @param requestBody
     * @returns Schedule 수정된 예약 실행 정보
     * @throws ApiError
     */
    public static updateSchedule(
        scheduleId: string,
        requestBody: Schedule,
    ): CancelablePromise<Schedule> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/schedules/{scheduleId}',
            path: {
                'scheduleId': scheduleId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `잘못된 요청`,
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `예약 실행을 찾을 수 없음`,
            },
        });
    }
    /**
     * 예약 실행 삭제
     * @param scheduleId
     * @returns void
     * @throws ApiError
     */
    public static deleteSchedule(
        scheduleId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/schedules/{scheduleId}',
            path: {
                'scheduleId': scheduleId,
            },
            errors: {
                401: `인증되지 않은 요청`,
                403: `권한 없음`,
                404: `예약 실행을 찾을 수 없음`,
            },
        });
    }
}
