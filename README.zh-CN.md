<!-- <p align="center">
  <a href="https://github.com/AllenBei/nest-client-service" target="blank">
</p> -->
Language : [🇺🇸](./README.md)  | 🇨🇳

# nest-client-service

## 前言

本项目是个人基于`nest.js`框架开发的一个项目库，用于快速搭建一个`nest.js`项目，
项目库中集成了用户账户这一块逻辑,开箱即用。

个人因需求全栈搞一个小程序，之前在网上找了不少 github 的项目作为参考。大多数都比较齐全（很多功能用不上），个人希望还是需要用的才写出来，所以自己整了一个。
库中只集成了用户账户这一块逻辑,大多数情况下C端通用，开箱即用。

仅集成了基本的用户注册和登录功能（微信openid授权）等。亲测可以使用，可以直接用于小程序全栈开发。
> [!TIP]
> 若不用于微信体系开发，可将`user.constant`的 wechat 相关内容删掉，把登录且自动注册去掉即可。

**本项目也很适合刚接触nestjs的小伙伴进行学习**，如果你能把项目里面的功能都搞明白（基本上我觉得需要的才会弄上去）
那么恭喜你，你已入门 nestjs 了，可以直接去开发了～

同时也适合需要实际开发可以通过本项目快速搭建一个 nestjs 项目，
新建`.env.development`配置好，调通把 appid 等需要的认证改为真实的项目，即可马上直接开发业务。

如果能帮到你，还请你在我的 [github项目](https://github.com/AllenBei/nest-client-service) 给我一个 **star**！！！谢谢了！

[项目地址点这里👈](https://github.com/AllenBei/nest-client-service)

## 简介

`nest-client-service` 是一款基于 `nest.js` 框架进行封装的服务端架构，它包含了服务端常用功能,并且具有易扩展，易配置等特点。
目前业务层面只集合了用户账户这一块逻辑,开箱即用。

- 日志系统 (记录所有请求的详细数据以及错误的相关信息)
- `mysql`, `redis` 数据库模块
- 注册登录功能(逻辑为登录未扫到对应 id 会进行自动注册)
- 单点登录
- 权限配置 (可根据接口动态配置)
- 统一配置了数据验证机制，并且统一了数据返回格式
- 验证账号
- 微信 openid 和 uniond 获取（需配置 appid 和 secret）
- 微信定位经纬度解析地址（需腾讯地图APIKEY，根据自己业务来调整即可）

## 安装

```bash
pnpm install
```

## 配置

- 该项目支持配置开发与生产配置,配置文件应放在项目的根目录 (项目配置放在`configs`目录下)
- 开发环境需要配置`.env.development`文件下，生产环境需要配置到根目录的`.env.production`文件
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
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 测试

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Licensed under the [MIT](/LICENSE) License.
