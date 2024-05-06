import { RESPONSE_STATUS } from '@app/constants/http.constant';

export interface IResponseBase<T> {
    status: RESPONSE_STATUS;

    message: string | unknown;

    data?: T;

    requestId: string;
}

// 错误的响应
export interface IFailResponse<T> extends IResponseBase<T> {
    status: RESPONSE_STATUS.ERROR;

    errno: number; // 失败的错误码 ERROR_CODE
}

// 成功的响应
export interface ISuccessResponse<T> extends IResponseBase<T> {
    status: RESPONSE_STATUS.OK;
}
