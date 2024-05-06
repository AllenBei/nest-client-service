import { Request } from 'express';

import { IUserLoginCache } from '@app/routers/user/user.interface';
import { IRoleAccessMap, IRoleAccessInfo } from '@app/routers/manage/role-manage/role-manage.interface';

// 路由处理正则
const ROUTER_REG_EXP = new RegExp(/(.*):[^/]+(.*)/g);

/**
 * 路由匹配方法
 * '/foo/bar' matches '/foo/*', '/resource1' matches '/:resource'
 * @param key1
 * @param key2
 * @returns
 */
const routerMatch = (key1: string, key2: string): boolean => {
    key2 = key2.replace(/\/\*/g, '/.*');

    for (; ;) {
        if (!key2.includes('/:')) break;

        key2 = key2.replace(ROUTER_REG_EXP, '$1[^/]+$2');
    }

    if (key2 === '*') key2 = '(.*)';

    return new RegExp(`^${key2}$`).test(key1);
};

/**
 * 请求的方法匹配
 * @param method1
 * @param method2
 * @returns
 */
const methodMatch = (method1: string, method2: string): boolean => {
    return method1.toLocaleUpperCase() === method2.toLocaleUpperCase();
};

/**
 * 角色权限验证
 * @param req
 * @param info
 * @param accessMap
 * @returns
 */
export const validateUserRouterAuth = (req: Request, info: IUserLoginCache, accessMap: IRoleAccessMap): boolean => {
    // 获取用户访问的url,以及method
    const { path, method } = req;

    // 获取用户的所有权限
    const { roleIds = [] } = info;

    const routerList = roleIds.reduce((total: IRoleAccessInfo[], per: string | number) => {
        if (accessMap[per]) total.push(...accessMap[per]);
        return total;
    }, []);

    return routerList.some((item: IRoleAccessInfo) => routerMatch(path, item.routerUrl) && methodMatch(method, item.action));
};
