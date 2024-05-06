import { v4 } from 'uuid';
import { Request, Response } from 'express';

declare module 'express' {
    interface Request {
        requestId: string;
    }
}

/**
 * 往请求中添加requestId标识
 * @param req
 * @param res
 * @param next
 */
export const RequestIdMiddleware = (req: Request, res: Response, next: () => void) => {
    req.requestId = v4();

    next();
};
