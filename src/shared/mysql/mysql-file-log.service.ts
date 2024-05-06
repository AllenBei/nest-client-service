import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger, createLogger } from 'winston';
import { FileLogger, LoggerOptions } from 'typeorm';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class MysqlFileLog extends FileLogger {
    private instance: Logger;

    public constructor(
        private readonly configService: ConfigService,
        private readonly loggerOptions?: LoggerOptions,
    ) {
        super(loggerOptions);

        if (typeof loggerOptions !== 'boolean' || loggerOptions) {
            this.instance = this.initFileInstance();
        }
    }

    private initFileInstance(): Logger {
        const maxSize = this.configService.get('app.logs.maxSize') || '20m';
        const maxFiles = this.configService.get('app.logs.maxFiles') || '12d';

        const defaultConfig = {
            auditFile: 'logs/mysql-audit.log',
            filename: 'logs/mysql.%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize, // 每个日志文件的最大大小
            maxFiles, // 保留的日志文件数
        };

        return createLogger({
            transports: new DailyRotateFile(defaultConfig),
        });
    }

    public write(strings: string | string[]): void {
        strings = Array.isArray(strings) ? strings : [strings];

        const logContent = strings.map((str) => '[' + new Date().toLocaleString() + ']' + str).join('\r\n') + '\r\n';

        this.instance.log('info', logContent);
    }
}
