<!-- <p align="center">
  <a href="https://github.com/AllenBei/nest-client-service" target="blank">
</p> -->
Language : 🇺🇸 | [🇨🇳](./README.zh-CN.md) 

# nest-client-service

## INTRODUCTION

This project is a personal library developed based on the `nest.js` framework, designed for quickly setting up a nest.js project.

I decided to develop this library because I needed to build a wechat mini program as a full-stack developer.
I looked at some projects on GitHub for reference, but most were quite comprehensive (with many features not needed).
Therefore, I decided to create my own library focusing only on the user account logic, which is generally applicable to the client side and ready to use.

This project only integrates basic user registration and login functionality (WeChat openid authorization), among others. It has been tested and can be directly used for full-stack development.
> [!TIP]
> If not used for WeChat system development, you can remove the WeChat-related content in `user.constant`, and simply remove the login and auto-registration feature.

**This project is also suitable for beginners who are just starting with NestJS for learning.** If you can understand all the functionalities in the project, congratulations, you have mastered NestJS and can start developing right away.

It is also suitable for those who need practical development and want to quickly set up a NestJS project through this library. Create a `.env.development` file, configure it properly, change the appid and other necessary authentication to real project values, and you can start developing business immediately.

If this helps you, please give me a star on my [GitHub project](https://github.com/AllenBei/nest-client-service)!! Thank you!

## Features

`nest-client-service` is a server-side architecture encapsulated based on the NESTJS framework. It includes commonly used server functions and features such as easy expansion and configuration. Currently, it only integrates user account logic on the business side, ready to use out of the project.

- Logging System (Records detailed data of all requests and relevant information about errors)
- `MySQL`, `Redis` database modules
- Registration and Login Functionality (Logic for automatic registration if the corresponding ID is not found during login)
- Single Sign-On
- Permission Configuration (Can be dynamically configured according to the interface)
- Unified Data Validation Mechanism and Data Return Format
- Account Verification
- WeChat openid and unionid retrieval (Requires configuring appid and secret)
- Parsing WeChat location coordinates to addresses (Requires Tencent Map API Key, adjust according to your business needs)

## INSTALL

```bash
pnpm install
```

## ENVIRONMENT

- This project supports configuring development and production configurations. Configuration files should be placed in the root directory of the project (project configurations are placed in the `configs` directory).
- Development environment requires configuring the `.env.development` file, and production environment requires configuring the `.env.production` file in the root directory.
    Example configuration:

```bash
APP_PORT=3000

# mysql
MYSQL_HOST=***
MYSQL_DATABASE=***
MYSQL_PASSWORD=***

# redis
REDIS_HOST=***
REDIS_PASSWORD=***

# emailer
EMAIL_HOST=***
EMAIL_SOURCE_EMAIL=***@gmail.com
EMAIL_AUTH_CODE=***
```

> See `configs` for more details

## RUN

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## TEST

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
