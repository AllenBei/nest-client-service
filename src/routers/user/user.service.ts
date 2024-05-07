// import * as bcrypt from 'bcrypt';
// import * as svgCaptcha from 'svg-captcha';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { HttpService } from '@nestjs/axios'

import { LoginCodeDto } from './user.dto';
import { AuthService } from '@app/shared/auth';
import { RedisService } from '@app/shared/redis';
import { FailException } from '@app/exceptions/fail.exception';
import { ERROR_CODE } from '@app/constants/error-code.constant';
import { User } from '@app/entities';
import { TENCENT_MAP_LOCATION_KEY, USER_STATUS, WECHAT_CODE_SWTICH_ID_URL, WECHAT_LOCATION_URL, WECHAT_MINI_PRO } from './user.constant';
import { userLoginCachePrefix, } from './user.helper';
import { IUserInfo, IUserLoginResponse, IUserRegisterResponse } from './user.interface';
import { RESPONSE_DEFAULT_TEXT } from '@app/constants/http.constant';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
    public constructor(
        private http: HttpService,
        private redisService: RedisService,
        private configService: ConfigService,
        // private emailerService: EmailerService,
        private authService: AuthService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }


    /**
     * 注册/验证用户
     * @param unionId
     * @param openId
     * @param phone
     * @param password
     * @returns
     */
    public async registerUser(unionid: string, openid: string): Promise<IUserRegisterResponse> {
        // 查询unionid存在的用户
        const currentUser = await this.userRepository.findOneBy({ unionid });
        // console.log('currentUser', currentUser)
        if (currentUser) throw new FailException(ERROR_CODE.USER.USER_UNION_ID_EXISTS, RESPONSE_DEFAULT_TEXT.ACCOUNT_EXISTS);

        //因小程序自带权限鉴定功能，unionId 为处理后的数据。所以早期为 null，后续salt 可用于的密码。
        // const salt = this.configService.get('app.userPwdSalt') || '';
        // const unionidHash = await bcrypt.hash(unionid, salt);
        const user = this.userRepository.create({
            username: `用户${openid.slice(openid.length - 6, openid.length - 1)}`,
            password: null,
            unionid,
            openid,
        });
        console.log(user)
        await this.userRepository.save(user);
        // 删除掉指定的验证缓存
        // await this.redisService.delete(emailHandle);

        // console.log('注册', unionid)
        return { unionid, message: '注册成功' };
    }


    /**
     * 用户登录
     * @param loginInfo
     * @returns
     */
    public async login(loginInfo: LoginCodeDto): Promise<IUserLoginResponse> {
        // 通过 code 来和微信第三方交互获取对应的 openid
        const { code } = loginInfo;
        const {
            APPID,
            SECRET,
            GRANT_TYPE,
        } = WECHAT_MINI_PRO
        const checkResultObservable = this.http
            .get(WECHAT_CODE_SWTICH_ID_URL, { params: { appid: APPID, secret: SECRET, js_code: code, grant_type: GRANT_TYPE } })
        const res = await lastValueFrom(checkResultObservable);
        // console.log('wechat feedback', res)
        //若失败抛出 errcode
        if (res.data.errcode)
            throw new FailException(res.data.errcode, res.data.errmsg);
        const { unionid, openid } = res.data
        // console.log('res', res.data)


        // const salt = this.configService.get('app.userPwdSalt') || '';
        // const unionidHash = await bcrypt.hash(unionid, salt);
        // const validatePassword = await bcrypt.compare(currentUser.unionid, unionidHash);

        //查询当前用户是否存在
        const isUserExists = await this.userRepository
            .createQueryBuilder('user')
            .select([
                'user.unionid AS unionid',
            ])
            .where('user.unionid=:unionid', { unionid })
            .getRawOne();

        // console.log(isUserExists)
        if (!isUserExists) {
            // throw new FailException(ERROR_CODE.USER.USER_LOGIN_ERROR, '用户不存在');
            //调用注册
            // console.log('注册调用', unionid, openid)
            await this.registerUser(unionid, openid);
        }

        const currentUser = await this.userRepository
            .createQueryBuilder('user')
            .select([
                'user.id AS id',
                'user.unionid AS unionid',
                'user.openid AS openid',
                'user.username AS username',
                'user.status AS status',
                // 'user.admin AS admin',
                // 'ur.roles AS roles',
            ])
            // .leftJoin(`(${subQuery})`, 'ur', 'ur.userId=user.id')
            .where('user.unionid=:unionid', { unionid })
            .getRawOne();

        // console.log(currentUser)

        const { id, username, status } = currentUser;

        // 如果用户的状态注销，则更改为正常

        if (status !== USER_STATUS.NORMAL) {
            // throw new FailException(ERROR_CODE.USER.USER_STATUS_FORBIDDEN);

            await this.userRepository.update({ unionid }, { status: 1 });
        }

        // 返回服务端的token
        const token = this.authService.genToken({ id, username });

        // 如果不配置，那么则不设置过期时间
        // const expireTime = this.configService.get<number>('app.loginExpiresIn');

        // 需要把相关的信息存入到redis数据库中, 并且设置过期时间
        // await this.redisService.set(
        //     userLoginCachePrefix(unionid),
        //     {
        //         username,
        //         unionid: unionid,
        //         openid: openid,
        //         token,
        //         // admin,
        //         // roleIds: roles ? roles.split(',').map((item: string) => Number(item)) : [],
        //     },
        //     // expireTime,
        // );

        // 删除已验证的验证码
        // await this.redisService.delete(captchaKey);

        return {
            token,
        };
    }

    /**
     * 用户注销
     * @param id
     * @param unionid
     */
    public async cancelUser(id: number): Promise<void> {
        const userProfile = await this.userRepository.findOne({
            select: ['id', 'unionid', 'status'],
            where: { id },
        });
        if (!userProfile) throw new FailException(ERROR_CODE.USER.USER_PROFILE_ERROR);
        // 删除redis中的缓存
        if (userProfile.id) {
            const redisHandle = userLoginCachePrefix(userProfile.id);
            await this.redisService.delete(redisHandle);
        }

        await this.userRepository.update({ id }, { status: 0});
    }

    /**
     * 查询用户自身主信息
     * @param userId
     * @returns
     */
    public async queryUserProfile(userId: number): Promise<Omit<IUserInfo, 'status'>> {
        const userProfile = await this.userRepository.findOne({
            select: ['id', 'unionid', 'openid', 'username', 'email', 'avatar', 'gender', 'admin', 'status'],
            where: { id: userId },
        });
        if (!userProfile) throw new FailException(ERROR_CODE.USER.USER_PROFILE_ERROR);
        console.log('userProfile', userProfile)
        const { id, username, avatar, gender } = userProfile
        return {
            id, username, avatar, gender
            // access
        };
    }


    /**
     * 根据腾讯地图获取所在地
     * @param latitude
     * @param longitude 
     */
    public async queryCityApi(id: number, LocationAxis: { latitude: string, longitude: string }): Promise<{ any }> {
        const { latitude, longitude } = LocationAxis

        const checkResultObservable = this.http
            .get(`${WECHAT_LOCATION_URL}?location=${latitude},${longitude}&key=${TENCENT_MAP_LOCATION_KEY}`)
        const res = await lastValueFrom(checkResultObservable);
        console.log('tcMap', res.data)
        //若失败抛出 errcode
        if (res.data.status !== 0)
            throw new FailException(res.data.status, res.data.message);

        return res.data.result.address_component;
    }
}
