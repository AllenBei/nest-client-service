import { HttpStatus } from '@nestjs/common';
import { CustomException } from './custom.exception';
import { IFailResponse } from '@app/interfaces/http.interface';
import { RESPONSE_DEFAULT_TEXT, RESPONSE_STATUS } from '@app/constants/http.constant';

export class FailException extends CustomException {
    public constructor(errorCode: number, message?: string | unknown) {
        const httpFailRes: IFailResponse<undefined | Record<string, unknown>> = {
            status: RESPONSE_STATUS.ERROR,

            message: message || RESPONSE_DEFAULT_TEXT.ERROR,

            errno: errorCode,

            requestId: '',

            // data: data
        };

        super(httpFailRes, HttpStatus.OK);
    }
}
