import { RoleManageService } from './role-manage.service';
import { Controller, Get, Post, Put, Query, Body, Delete } from '@nestjs/common';

import { RoleListDto, CreateRoleDto, ModifyRoleDto, AccessRoleAccessDto, DeleteRoleDto } from './role-manage.dto';

@Controller('role-manage')
export class RoleManageController {
    public constructor(private readonly roleManageService: RoleManageService) {}
    // 获取角色列表
    @Get('list')
    public async roleList(@Query() queryInfo: RoleListDto) {
        return this.roleManageService.queryRoleList(queryInfo);
    }

    // 给角色分配权限
    @Post('assign-access')
    public async assignRoleAccess(@Body() assignRoleAccessInfo: AccessRoleAccessDto) {
        const { role, access } = assignRoleAccessInfo;

        await this.roleManageService.assignRoleAccessInfo(role, access);
    }

    // 添加角色
    @Post()
    public async addRole(@Body() roleInfo: CreateRoleDto) {
        const { name, desc = '' } = roleInfo;

        await this.roleManageService.createRole(name, desc);
    }

    // 修改角色信息
    @Put()
    public async modifyRole(@Body() roleInfo: ModifyRoleDto) {
        const { id, name, desc } = roleInfo;

        await this.roleManageService.modifyRole(id, name, desc);
    }

    // 删除角色
    @Delete()
    public async deleteRole(@Body() rolesInfo: DeleteRoleDto) {
        const { roles } = rolesInfo;

        await this.roleManageService.deleteRole(roles);
    }
}
