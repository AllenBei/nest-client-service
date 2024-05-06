import { USER_STATUS } from './user.constant';


// 注册返回
export interface IUserRegisterResponse {
    unionid: string;
    message: string;
}

// 登录后用返回给前端的token
export interface IUserLoginResponse {
    token: string;
}

// 登录验证码接口返回值
export interface IUserCaptchaResponse {
    hashId: string;

    captcha: string;
}

export interface IUserInfoAccess {
    name: string;

    routerName: string;

    routerUrl: string;
}

// 用户的基础信息
export interface IUserInfo {
    id: number;

    unionid?: string;

    username: string;

    email?: string;

    avatar: string;

    gender: number;

    status: USER_STATUS;

    access?: Array<IUserInfoAccess>;
}


// 缓存中用户的信息
export interface IUserLoginCache extends Omit<IUserInfo, 'avatar'> {
    roleIds: number[];

    token: string;

    admin: number; // 是否是管理员账户
}
