import { SetMetadata } from '@nestjs/common';

import { PUBLIC_ACCESS_INTERFACE, HTTP_ORIGIN_RESPONSE, LOGIN_ACCESS_INTERFACE } from '@app/constants/reflector.constant';

/**
 * 免验证登录标识
 * @returns
 */
export const UsePublicInterface = (): MethodDecorator => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        SetMetadata(PUBLIC_ACCESS_INTERFACE, true)(descriptor.value);
    };
};

/**
 * 方法使用最原始的返回数据格式, 即api的方式进行返回
 * @returns
 */
export const UseOriginMethodResponse = (): MethodDecorator => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        SetMetadata(HTTP_ORIGIN_RESPONSE, true)(descriptor.value);
    };
};

/**
 * 是否是登录即可访问的接口，无需配置权限
 * @returns
 */
export const UseLoginAccessInterface = (): MethodDecorator => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        SetMetadata(LOGIN_ACCESS_INTERFACE, true)(descriptor.value);
    };
};
