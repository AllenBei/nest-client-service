import { reflector } from './reflector.helper';
import { HTTP_ORIGIN_RESPONSE, LOGIN_ACCESS_INTERFACE, PUBLIC_ACCESS_INTERFACE } from '@app/constants/reflector.constant';

// 验证是否使用初始的api返回值
export const IsOriginResponse = (target: any): boolean => {
    return reflector.get<boolean>(HTTP_ORIGIN_RESPONSE, target) || false;
};

// 非登录验证接口
export const IsPublicInterface = (target: any): boolean => {
    return reflector.get<boolean>(PUBLIC_ACCESS_INTERFACE, target) || false;
};

// 判断是否是登录即可访问，无需配置权限
export const IsLoginAccessInterface = (target: any): boolean => {
    return reflector.get<boolean>(LOGIN_ACCESS_INTERFACE, target) || false;
};
