import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedisModule } from '@app/shared/redis';
import { Access, AccessCategory } from '@app/entities';
import { AccessManageService } from './access-manage.service';
import { AccessManageController } from './access-manage.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Access, AccessCategory]), RedisModule],
    controllers: [AccessManageController],
    providers: [AccessManageService],
})
export class AccessManageModule {}
