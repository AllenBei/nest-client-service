import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { IPayLoad } from './auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(private readonly configService: ConfigService) {
        const secretOrKey = configService.get('app.jwt.secretSalt') || '';

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey,
        });
    }

    async validate(payload: IPayLoad) {
        try {
            const { id, username } = payload;

            return { id, username };
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}
