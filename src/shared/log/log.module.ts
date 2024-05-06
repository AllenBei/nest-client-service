import { Module, Global } from '@nestjs/common';
import { LogFileService } from './log-file.service';
import { LogService } from './log.service';

@Global()
@Module({
    providers: [LogFileService],
    exports: [LogFileService],
})
export class LogModule {
    // 导出日志的实例
    public static createLogger(): LogService {
        return new LogService();
    }
}
