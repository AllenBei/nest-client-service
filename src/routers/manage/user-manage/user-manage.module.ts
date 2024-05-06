import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@app/entities';
import { RedisModule } from '@app/shared/redis';
import { UserManageService } from './user-manage.service';
import { UserManageController } from './user-manage.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RedisModule],
    providers: [UserManageService],
    controllers: [UserManageController],
})
export class UserManageModule {}
