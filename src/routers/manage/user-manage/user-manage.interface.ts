import { IUserInfo } from '@app/routers/user/user.interface';
import { IPagination } from '@app/interfaces/pagination.interface';

// 查询用户列表
export interface IUserListResponse extends IPagination {
    users: Omit<IUserInfo, 'access'>[];
}
