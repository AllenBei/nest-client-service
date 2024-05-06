import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Logger, createLogger, format } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

import { FILE_LOG } from './log.constant';
import { fileLevels, nestConsoleFormat } from './log.helper';

@Injectable()
export class LogFileService {
    private instance: Logger;

    public constructor(private readonly configService: ConfigService) {
        this.instance = this.initFileInstance();
    }

    private initFileInstance(): Logger {
        const maxSize = this.configService.get('app.logs.maxSize') || '20m';
        const maxFiles = this.configService.get('app.logs.maxFiles') || '12d';

        const defaultConfig = {
            level: FILE_LOG, // 写入文件的日志级别
            auditFile: 'logs/http-audit.log',
            filename: 'logs/http.%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize, // 每个日志文件的最大大小
            maxFiles, // 保留的日志文件数
        };

        return createLogger({
            levels: fileLevels,
            format: format.combine(format.simple(), format.timestamp(), nestConsoleFormat()),
            transports: [new DailyRotateFile(defaultConfig)],
        });
    }

    private fileWithMeta(level: string, message: string, context?: string, meta?: any): void {
        this.instance.log({ level, message, context, ...meta });
    }

    public file(message: any, context?: string): any {
        if (message && typeof message === 'object') {
            const { message: msg, level = FILE_LOG, ...meta } = message;
            this.fileWithMeta(level, msg, context, meta);
        } else {
            this.fileWithMeta(FILE_LOG, message, context);
        }
    }
}
