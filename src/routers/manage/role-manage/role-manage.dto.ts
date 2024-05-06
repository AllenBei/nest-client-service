import { PaginationDto } from '@app/dtos/pagination.dto';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, Length } from 'class-validator';

export class RoleListDto extends PaginationDto {}

export class CreateRoleDto {
    @Length(1, 60)
    @Transform(({ value }) => value.trim())
    @Type(() => String)
    @IsNotEmpty()
    name: string;

    @Length(0, 200)
    @IsOptional()
    desc: string = '';
}

// 修改角色信息
export class ModifyRoleDto extends CreateRoleDto {
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    id: number;
}

// 给角色分配权限
export class AccessRoleAccessDto {
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    role: number;

    @Length(1)
    @Transform(({ value }) => value.toString().trim())
    @IsNotEmpty()
    access: string;
}

export class DeleteRoleDto {
    @Length(1)
    @Transform(({ value }) => value.toString().trim())
    @IsNotEmpty()
    roles: string;
}
