import { Provider } from '@nestjs/common';

import { REDIS_CONFIG_PROVIDER } from './redis.constant';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

export const redisProvider: Provider = {
    provide: REDIS_CONFIG_PROVIDER,

    useFactory: (configService: ConfigService) => {
        const redisOptions = configService.get('database.redis');

        return new Redis({
            host: redisOptions.host,

            port: redisOptions.port,

            username: redisOptions.username,

            password: redisOptions.password,

            db: redisOptions.database,
        });
    },

    inject: [ConfigService],
};
