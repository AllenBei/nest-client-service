import { ISuccessResponse } from '@app/interfaces/http.interface';
import { RESPONSE_DEFAULT_TEXT, RESPONSE_STATUS } from '@app/constants/http.constant';

/**
 * 自定义响应的格式以及内容
 * @param data
 * @param id
 * @returns
 */
export const customResponse = <T>(data: T, id: string): ISuccessResponse<T> => {
    return {
        status: RESPONSE_STATUS.OK,

        message: RESPONSE_DEFAULT_TEXT.OK,

        requestId: id,

        data,
    };
};
