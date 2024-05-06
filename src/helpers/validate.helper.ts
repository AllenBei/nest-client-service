import iterate from 'iterare';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { FailException } from '@app/exceptions/fail.exception';
import { ERROR_CODE } from '@app/constants/error-code.constant';

function exceptionFactory(validationErrors: Array<ValidationError>) {
    if (this.isDetailedOutputDisabled) return new FailException(ERROR_CODE.COMMON.PARAM_ERROR);

    // const errors = this.flattenValidationErrors(validationErrors);
    const errorsList = iterate(validationErrors)
        .map((error) => this.mapChildrenToValidationErrors(error))
        .flatten()
        .filter((item) => !!item.constraints)
        .map((item) => {
            const obj: Record<string, string> = {};
            const values = Object.values(item.constraints);

            obj[item.property] = values[0] as string;

            return obj;
        })
        .flatten()
        .toArray();

    const errors = Object.assign({}, ...errorsList);

    // 根据错误返回验证失败的消息
    return new FailException(ERROR_CODE.COMMON.PARAM_ERROR, errors);
}

/**
 *
 * @param displayError 是否展示验证的错误信息
 * @returns
 */
export const validationHelper = (displayError: boolean = false): ValidationPipe => {
    return new ValidationPipe({
        transform: true, // 对结果进行自动转换
        // errorHttpStatusCode: HttpStatus.OK,
        exceptionFactory,

        disableErrorMessages: !displayError,
    });
};
