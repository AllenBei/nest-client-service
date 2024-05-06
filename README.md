<p align="center">
  <a href="https://github.com/AllenBei/nest-client-service" target="blank">
</p>

# nest-client-service
自建nestjs项目库，仅集成了基本的用户注册和登录功能（微信openid授权）等。亲测可以使用，可以直接用于小程序全栈开发。-Self-built nestjs project base, only integrated with the basic user registration and login functions ( WeChat openid authorization ) and so on. Tested to work, can be directly used for wechat mini program full stack development .

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## 简介

`nest-client-service` 是一款基于 `nest.js` 框架进行封装的服务端架构，它包含了服务端常用功能, 并且具有易扩展，易配置等特点

-   日志系统 (记录所有请求的详细数据以及错误的相关信息)
-   `mysql`, `redis` 数据库模块
-   注册登录功能
-   单点登录
-   权限配置 (可根据接口动态配置)
-   统一配置了数据验证机制，并且统一了数据返回格式
-   微信 openid 和 uniond 获取（需配置 appid 和 secret）

## 安装

```bash
$ yarn install
```

## 配置

-   该项目支持配置开发与生产配置,配置文件应放在项目的根目录 (项目配置放在`configs`目录下)
-   开发环境需要配置`.env.development`文件下，生产环境需要配置到根目录的`.env.production`文件
    示例配置：

```bash
APP_PORT=3000

# mysql数据库信息
MYSQL_HOST=***
MYSQL_DATABASE=***
MYSQL_PASSWORD=***

# redis数据库信息
REDIS_HOST=***
REDIS_PASSWORD=***

# emailer的配置信息
EMAIL_HOST=***
EMAIL_SOURCE_EMAIL=***@gmail.com
EMAIL_AUTH_CODE=***
```

> 更多配置祥见configs目录中的配置

## 运行

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## 测试

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Licensed under the [MIT](/LICENSE) License.
