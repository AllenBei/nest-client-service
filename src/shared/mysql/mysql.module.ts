import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { mysqlProvider } from './mysql.provider';

@Module({
    imports: [TypeOrmModule.forRootAsync(mysqlProvider)],
})
export class MysqlModule {}
