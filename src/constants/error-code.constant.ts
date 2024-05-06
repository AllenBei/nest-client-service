enum COMMON {
    PARAM_ERROR = 900101, //参数错误
    RECORD_EXITS = 900102, // 记录已存在
    RECORD_NOT_EXISTS = 900103, // 记录不存在
    RESTRICTED_PERMISSIONS = 900104, //权限受限
}

// 服务器错误
enum SERVICE {
    EMAIL_CONFIG_ERROR = 980101, // 邮件配置错误
    EMAIL_SEND_ERROR = 980102, // 邮件发送错误

    SERVICE_ERROR = 9900,
    OTHER_API_SERVICE_ERROR = 9901,
    SENSITIVE_API_SERVICE_ERROR = 9902,
}

// 用户相关的错误
enum USER {
    USER_UNION_ID_EXISTS = 900200, // 用户微信 unionId已经存在
    USER_EMAIL_EXISTS = 900201, // 用户邮箱已经存在
    USER_EMAIL_CODE_ERROR = 900202, // 验证码有误
    USER_LOGIN_ERROR = 900203, // 用户不存在或者密码错误
    USER_CAPTCHA_ERROR = 900204, // 用户登录验证码有误
    USER_STATUS_FORBIDDEN = 900205, //用户状态不正常
    USER_PROFILE_ERROR = 900206, // 查询用户信息错误
    USER_NOT_EXISTS = 900207, // 用户不存在
}

// enum WXAPI {
//     INVALID_CODE = 40029 //code 无效
// }

// 权限相关的错误
enum ACCESS {
    ACCESS_CATEGORY_EXISTS = 900301, // 权限类别不存在
    ACCESS_CATEGORY_NOT_EXISTS = 900302, // 权限类别不存在
    ACCESS_EXISTS = 900303, // 当前权限已存在
    ACCESS_NOT_EXISTS = 900304, // 当前权限不存在
}

export const ERROR_CODE = {
    COMMON,
    SERVICE,
    USER,
    ACCESS,
};
