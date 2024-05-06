import { IPayLoad } from '@app/shared/auth';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 获取用户信息
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): IPayLoad => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
