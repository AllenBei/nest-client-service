import { IPagination } from '@app/interfaces/pagination.interface';

// 角色信息
export interface IRoleItemInfo {
    id: number;

    name: string;

    description: string;
}

// 返回的角色列表
export interface IRoleListResponse extends IPagination {
    roles: Array<IRoleItemInfo>;
}

export interface IRoleAccessInfo {
    action: string;
    routerUrl: string;
}

export interface IRoleAccessQueryItem extends IRoleAccessInfo {
    roleId: number;
}

export type IRoleAccessMap = Record<string | number, IRoleAccessInfo[]>;
