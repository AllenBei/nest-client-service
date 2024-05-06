import { Module } from '@nestjs/common';
import { UserManageModule } from './user-manage/user-manage.module';
import { RoleManageModule } from './role-manage/role-manage.module';
import { AccessManageModule } from './access-manage/access-manage.module';

@Module({
    imports: [UserManageModule, RoleManageModule, AccessManageModule],
})
export class ManageModule {}
