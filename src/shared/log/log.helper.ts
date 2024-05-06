import { inspect } from 'util';
import { format, Logform } from 'winston';
import safeStringify from 'fast-safe-stringify';

import * as pkg from '@root/package.json';
import { FILE_LOG } from './log.constant';

// 权重由低到高，指定高的translate会影响低的，但是指定低的不会影响高的
export const logLevels = {
    warn: 0,
    error: 1,
    info: 2,
};

// 写入文件的日志等级
export const fileLevels = {
    [FILE_LOG]: 0,
};

const appName = pkg.name || 'Nest';

const clc = {
    bold: (text: string) => `\x1B[1m${text}\x1B[0m`,
    green: (text: string) => `\x1B[32m${text}\x1B[39m`,
    yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
    red: (text: string) => `\x1B[31m${text}\x1B[39m`,
    magentaBright: (text: string) => `\x1B[95m${text}\x1B[39m`,
    cyanBright: (text: string) => `\x1B[96m${text}\x1B[39m`,
};

const nestColorMap: Record<string, (text: string) => string> = {
    info: clc.green,
    error: clc.red,
    warn: clc.yellow,
};

/**
 * 格式化日志的文本
 * @param message
 * @param level
 * @param context
 * @param ms
 * @returns
 */
export const formatLog = (message: string, level: string, context?: string, ms?: string): string => {
    const color = nestColorMap[level] || ((text: string): string => text);

    return `${color(`[${appName}] ${level.charAt(0).toUpperCase() + level.slice(1)}`)}\t${
        context ? clc.yellow(`[${context}] `) : ''
    }${color(message || '')}${ms ? clc.yellow('(' + ms + ')') : ''}`;
};

/**
 * 自定义的日志format
 * @returns
 */
export const nestConsoleFormat = (): Logform.Format => {
    return format.printf(({ context, timestamp, level, message, ms, ...meta }) => {
        const stringifiedMeta = safeStringify(meta);
        const formattedMeta = inspect(JSON.parse(stringifiedMeta));
        message = message ? (formattedMeta === '{}' ? message : `${message} - ${formattedMeta}`) : formattedMeta;

        // 如果是写入文件，则不需要作其他的处理
        if (level === FILE_LOG) return message;

        if ('undefined' !== typeof timestamp) {
            try {
                if (timestamp === new Date(timestamp).toISOString()) {
                    timestamp = new Date(timestamp).toLocaleString();
                }
            } catch (error) {}
        }

        return formatLog(message, level, context, ms);
    });
};
