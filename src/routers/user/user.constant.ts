export enum USER_STATUS {
    FORBID, // 禁止状态

    NORMAL, // 正常状态
}

export enum USER_ADMIN {
    NORMAL, // 普通用户

    ADMIN, // 管理员用户
}

// 发送邮件的类别
export enum USER_EMAIL_TYPE {
    REGISTER, // 注册

    PASSWORD_RESET, // 密码重置
}

export const USER_CAPTCHA_WIDTH = 100;
export const USER_CAPTCHA_HEIGHT = 34;
export const USER_CAPTCHA_SIZE = 4;
export const USER_CAPTCHA_FONT_SIZE = 50;
export const USER_CAPTCHA_BACKGROUND = '#cc9966';
export const USER_CAPTCHA_EXPIRE = 5 * 60;

export const WECHAT_CODE_SWTICH_ID_URL = 'https://api.weixin.qq.com/sns/jscode2session'
export const WECHAT_LOCATION_URL = 'https://apis.map.qq.com/ws/geocoder/v1/'


export const WECHAT_MINI_PRO = {
    APPID: 'xxx',
    SECRET: 'xxx',
    GRANT_TYPE: 'authorization_code',
}

export const WECHAT_MINI_TEST = {
    APPID: 'xxx',
    SECRET: 'xxx',
    GRANT_TYPE: 'authorization_code',
}
//腾讯地图地址逆解析key
export const TENCENT_MAP_LOCATION_KEY = 'xxx'