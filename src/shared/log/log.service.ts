import { Injectable, LoggerService } from '@nestjs/common';
import { Logger, createLogger, transports, format } from 'winston';

import { logLevels, nestConsoleFormat } from './log.helper';

@Injectable()
export class LogService implements LoggerService {
    private instance: Logger;

    public constructor() {
        this.instance = this.initLogInstance();
    }

    private initLogInstance(): Logger {
        return createLogger({
            levels: logLevels,
            format: format.combine(format.simple(), format.timestamp(), format.ms(), nestConsoleFormat()),
            transports: [new transports.Console()],
        });
    }

    private logWithMeta(level: string, message: string, context?: string, meta?: any): void {
        this.instance.log({ level, message, context, ...meta });
    }

    public log(message: any, context?: string): any {
        if (message && typeof message === 'object') {
            const { message: msg, level = 'info', ...meta } = message;
            this.logWithMeta(level, msg, context, meta);
        } else {
            this.logWithMeta('info', message, context);
        }
    }

    public error(message: any, trace?: string, context?: string): any {
        if (message instanceof Error) {
            const { message: msg, stack, ...meta } = message;
            this.logWithMeta('error', msg, context, { stack: trace || stack, error: message, ...meta });
        } else if (message && typeof message === 'object') {
            const { message: msg, ...meta } = message;
            this.logWithMeta('error', msg, context, { stack: trace, ...meta });
        } else {
            this.logWithMeta('error', message, context, { stack: trace });
        }
    }

    public warn(message: any, context?: string): any {
        if (message && typeof message === 'object') {
            const { message: msg, ...meta } = message;
            this.logWithMeta('warn', msg, context, meta);
        } else {
            this.logWithMeta('warn', message, context);
        }
    }
}
