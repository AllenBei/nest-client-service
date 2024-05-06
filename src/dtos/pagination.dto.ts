import { Transform, Type } from 'class-transformer';
import { IsInt, IsPositive, ValidateIf, IsOptional, isDefined, IsString } from 'class-validator';

export class PaginationDto {
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @ValidateIf((object: any) => isDefined(object.pageSize))
    page: number;

    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @ValidateIf((object: any) => isDefined(object.page))
    pageSize?: number;

    @Transform(({ value }) => value.trim())
    @IsString()
    @Type(() => String)
    @IsOptional()
    q?: string;
}
