import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPayLoad } from './auth.interface';

@Injectable()
export class AuthService {
    public constructor(private readonly jwtService: JwtService) { }

    /**
     * 生成jwt验证token
     * @param payLoad
     */
    public genToken(payLoad: IPayLoad): string {
        return this.jwtService.sign(payLoad);
    }

    /**
     * 解码token
     * @param token
     */
    public verifyToken(token: string | null): IPayLoad | void {
        try {
            if (!token) return;

            return this.jwtService.verify<IPayLoad>(token);
        } catch (err) {
            return;
        }
    }
    
}
