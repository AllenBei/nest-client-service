import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from '@app/entities';
import { RedisModule } from '@app/shared/redis';
import { RoleManageService } from './role-manage.service';
import { RoleManageController } from './role-manage.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Role]), RedisModule],
    controllers: [RoleManageController],
    providers: [RoleManageService],
})
export class RoleManageModule {}
