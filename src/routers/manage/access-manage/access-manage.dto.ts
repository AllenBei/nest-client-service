import { PaginationDto } from '@app/dtos/pagination.dto';
import { OmitType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from 'class-validator';
import { ACCESS_ACTION_LIST, ACCESS_TYPE } from './access-manage.constant';

// 查询类别列表
export class AccessCategoryListDto extends PaginationDto {}

// 类别
export class AccessCategoryDto {
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    id: number;

    @Length(1)
    @Transform(({ value }) => value.toString().trim())
    @IsNotEmpty()
    name: string;

    @Length(0, 200)
    @IsString()
    @Transform(({ value }) => value.toString().trim())
    @IsOptional()
    desc: string;
}

// 创建accessCategory
export class CreateAccessCategoryDto extends OmitType(AccessCategoryDto, ['id']) {}

// 修改accessCategory
export class ModifyAccessCategoryDto extends AccessCategoryDto {}

// 删除accessCategory
export class DeleteAccessCategoryDto {
    @Length(1)
    @Transform(({ value }) => value.toString().trim())
    @IsNotEmpty()
    category: string;
}

export class AccessDto {
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    id: number;

    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    category: number;

    @Length(1, 60)
    @Transform(({ value }) => value.toString().trim())
    @IsNotEmpty()
    name: string;

    @Length(1, 60)
    @Transform(({ value }) => value.toString().trim())
    @IsOptional()
    routerName: string;

    @IsIn(Object.values(ACCESS_TYPE))
    @Type(() => Number)
    @IsNotEmpty()
    type: number;

    @IsIn(ACCESS_ACTION_LIST)
    @Transform(({ value }) => value.toString().trim().toLocaleUpperCase())
    @IsNotEmpty()
    action: string;

    @Length(1, 200)
    @Transform(({ value }) => value.toString().trim())
    @IsNotEmpty()
    router: string;

    @Length(0, 200)
    @Transform(({ value }) => value.toString().trim())
    @IsOptional()
    desc: string;
}

// 创建权限
export class CreateAccessDto extends OmitType(AccessDto, ['id']) {}

// 修改权限
export class ModifyAccessDto extends OmitType(AccessDto, ['category']) {}

// 删除权限
export class DeleteAccessDto {
    @Length(1)
    @Transform(({ value }) => value.toString().trim())
    @IsNotEmpty()
    access: string;
}
