import safeStringify from 'fast-safe-stringify';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

import { LogFileService } from '@app/shared/log';

@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
    public constructor(private readonly logFileService: LogFileService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const reqContent = safeStringify({
            requestId: req.requestId,
            method: req.method,
            ip: req.ip,
            url: req.url,
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query,
            time: new Date().toLocaleString(),
        });

        // 把请求的信息写入日志
        this.logFileService.file(reqContent);
        next();
    }
}
