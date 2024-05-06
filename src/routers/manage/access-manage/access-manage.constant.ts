export enum ACCESS_TYPE {
    ACTION, // 服务端的接口

    MENU, // 前端的路由页面
}

export enum ACCESS_ACTION {
    GET = 'GET',

    POST = 'POST',

    PUT = 'PUT',

    DELETE = 'DELETE',

    PATCH = 'PATCH',

    OPTIONS = 'OPTIONS',

    HEAD = 'HEAD',
}

export const ACCESS_ACTION_LIST = Object.values(ACCESS_ACTION);
