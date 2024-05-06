import { Controller, Get, Post, Body, Query, Delete, Put } from '@nestjs/common';

import { IPayLoad } from '@app/shared/auth';
import { User } from '@app/decorators/user.decorator';
import { UserManageService } from './user-manage.service';
import { AssignUserRolesDto, RemoveUsersDto, UserListDto, UserStatusSetDto } from './user-manage.dto';

@Controller('user-manage')
export class UserManageController {
    public constructor(private readonly userManageService: UserManageService) {}

    // 查询用户列表
    @Get('list')
    public queryUserList(@Query() userListParam: UserListDto) {
        return this.userManageService.queryUserList(userListParam);
    }

    // 给用户分配角色
    @Post('assign-roles')
    public async assignUserRoles(@Body() assignRoleInfo: AssignUserRolesDto, @User() userInfo: IPayLoad) {
        const { uid, roles } = assignRoleInfo;

        await this.userManageService.distributeUserRoles(userInfo.id, uid, roles);
    }

    // 设置用户状态
    @Put('status-set')
    public async userStatusSetting(@Body() statusSettingInfo: UserStatusSetDto, @User() userInfo: IPayLoad) {
        const { users, status } = statusSettingInfo;

        await this.userManageService.setUserStatus(userInfo.id, users, status);
    }

    // 删除用户
    @Delete('delete')
    public async removeUser(@Body() removeUserInfo: RemoveUsersDto, @User() userInfo: IPayLoad) {
        const { users } = removeUserInfo;

        await this.userManageService.removeUsers(userInfo.id, users);
    }
}
