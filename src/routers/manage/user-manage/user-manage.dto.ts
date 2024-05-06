import { Transform, Type } from 'class-transformer';

import { PaginationDto } from '@app/dtos/pagination.dto';
import { USER_STATUS } from '@app/routers/user/user.constant';
import { IsDefined, IsIn, IsInt, IsNotEmpty, IsPositive, Length } from 'class-validator';

// 查询用户列表
export class UserListDto extends PaginationDto {}

// 给用户分配角色
export class AssignUserRolesDto {
    // 用户id
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    uid: number;

    // 角色id,多个角色id中间用,隔开
    @Transform(({ value }) => value.trim())
    @Type(() => String)
    @IsDefined()
    roles: string;
}

// 删除用户
export class RemoveUsersDto {
    @Length(1)
    @Transform(({ value }) => value.trim())
    @Type(() => String)
    @IsNotEmpty()
    users: string;
}

// 设置用户状态
export class UserStatusSetDto extends RemoveUsersDto {
    @IsIn(Object.values(USER_STATUS))
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    status: number;
}
