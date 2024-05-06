import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),

        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                const secret = configService.get('app.jwt.secretSalt') || '';

                return {
                    secret,
                    signOptions: { expiresIn: configService.get('app.jwt.expiresIn') },
                };
            },
            inject: [ConfigService],
        }),
    ],

    providers: [AuthService, JwtStrategy],

    exports: [AuthService],
})
export class AuthModule {}
