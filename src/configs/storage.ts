import { registerAs } from '@nestjs/config';

// 文件存储配置
export default registerAs('storage', () => ({}));
