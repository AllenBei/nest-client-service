import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { MYSQL_CONFIG_PROVIDER } from './mysql.constant';
import { snakeNamingStrategy } from './snake-naming.strategy';
import { MysqlFileLog } from './mysql-file-log.service';

export const mysqlProvider: Provider = {
    provide: MYSQL_CONFIG_PROVIDER,

    useFactory: (configService: ConfigService): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => {
        const mysqlOptions = configService.get('database.mysql');
        const loggerOptions = mysqlOptions.loggerOptions || false;

        return {
            type: 'mysql',

            host: mysqlOptions.host,

            port: mysqlOptions.port,

            username: mysqlOptions.username,

            password: mysqlOptions.password,

            database: mysqlOptions.database,

            namingStrategy: snakeNamingStrategy, // 定义命名策略

            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],

            synchronize: true,

            logger: loggerOptions && new MysqlFileLog(configService, loggerOptions),
        };
    },

    inject: [ConfigService],
};
