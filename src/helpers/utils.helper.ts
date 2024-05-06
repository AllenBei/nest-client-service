/**
 * 获取当前的时间
 * @returns
 */
export const getCurrentTime = (): number => {
    return Math.round(Date.now() / 1000);
};

/**
 * 把前端传到服务端的token进行格式化
 * @param token
 * @returns
 */
export const formatAuthorization = (token: string | undefined): string | null => {
    return token ? token.replace(/Bearer\s*/, '') : null;
};

/**
 * 生成指定位数的验证码
 * @param len
 * @returns
 */
export const generateCode = (len: number = 6): string => {
    if (isNaN(len)) len = 6;

    let code = '';
    for (let i = 0; i < len; i++) {
        code += Math.floor(Math.random() * 10);
    }

    return code;
};
