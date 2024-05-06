// 内部错误码0表示请求成功，1表示请求失败
export enum RESPONSE_STATUS {
    OK,
    ERROR,
}

export enum RESPONSE_DEFAULT_TEXT {
    OK = 'request succeed', // 常规请求成功文本
    ERROR = 'request fail', // 常规请求失败文本
    ACCOUNT_EXISTS = 'Account already exists', // 重复请求失败文本（已存在数据库）
}

// 服务器错误的默认文本
export const SERVICE_ERROR_TEXT = 'Internal server error';
