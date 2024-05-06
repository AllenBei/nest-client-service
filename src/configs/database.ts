import { registerAs } from '@nestjs/config';

const env = process.env;

export default registerAs('database', () => ({
    // mysql数据库配置
    mysql: {
        host: env.MYSQL_HOST, // 数据库的主机

        port: parseInt(env.MYSQL_PORT || '3306', 10), // 数据库的端口，没有设置则默认为3306

        username: env.MYSQL_USERNAME || 'root', // 数据库的用户名

        password: env.MYSQL_PASSWORD || '', // 数据库的密码

        database: env.MYSQL_DATABASE || '', // 数据库的名称

        // typeorm的log值有分成 boolean | "all" | LogLevel[];
        // LogLevel = "query" | "schema" | "error" | "warn" | "info" | "log" | "migration";
        loggerOptions: ['error'],
    },

    // redis 数据库
    redis: {
        host: env.REDIS_HOST, // redis HOST主机

        port: parseInt(process.env.REDIS_PORT || '6379', 10), // 数据库的端口

        username: process.env.REDIS_USERNAME || 'default', // 数据库的登录用户名

        password: process.env.REDIS_PASSWORD || '', // 数据库的登录密码

        database: process.env.REDIS_DATABASE || 0, // 数据库名称
    },
}));
