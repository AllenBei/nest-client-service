import { AuthModule } from './auth';
import { Module } from '@nestjs/common';
import { LogModule } from './log/log.module';
import { MysqlModule } from './mysql/mysql.module';
import { RedisModule } from './redis/redis.module';
// import { EmailerModule } from './emailer/emailer.module';
// import { StorageModule } from './storage/storage.module';

@Module({
    imports: [
        AuthModule, 
        LogModule, 
        MysqlModule, 
        RedisModule, 
        // EmailerModule, 
    ],
})
export class SharedModule { }
