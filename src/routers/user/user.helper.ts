import { USER_EMAIL_TYPE } from './user.constant';

// 创建redis数据存放email验证码的key值
export const userRegisterEmailPrefix = (type: USER_EMAIL_TYPE, email: string) => `EMAIL_${type}_${email}`;

// 创建验证码的id
export const userLoginCaptchaPrefix = (captchaId: string) => `CAPTCHA_${captchaId}`;

// 创建redis数据存放用户信息的key值
export const userLoginCachePrefix = (id: string | number) => `USER_${id}`;
