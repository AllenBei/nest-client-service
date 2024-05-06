import { ConfigModule } from '@nestjs/config';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import * as configs from '@app/configs';
import { SharedModule } from '@app/shared/shared.module';
import { RoutersModule } from '@app/routers/routers.module';
import { RequestLogMiddleware } from '@app/middlewares/request-log.middleware';

@Module({
    imports: [
        // 配置全局通用配置
        ConfigModule.forRoot({
            isGlobal: true,
            load: Object.values(configs),
            // 把生产环境的配置与开发环境的配置分开处理
            envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
        }),

        // 加载路由模块
        RoutersModule,

        // 封装的公用功能模块
        SharedModule,
    ],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        // 进行日志中间件的处理
        consumer.apply(RequestLogMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
