import { IPagination } from '@app/interfaces/pagination.interface';

export interface IAccess {
    id: number;
    name: string;
    type: number;
    action: string;
    routerUrl: string;
    description: string;
}

export interface IAccessCategory {
    id: number;
    name: string;
    description: string;
    access: IAccess[];
}

export interface IAccessCategoryResponse extends IPagination {
    list: IAccessCategory[];
}
