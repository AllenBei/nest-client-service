import { Body, Controller, Post, Get, Param } from '@nestjs/common';

import { IPayLoad } from '@app/shared/auth';
import { UserService } from './user.service';
import { User } from '@app/decorators/user.decorator';
import { UseLoginAccessInterface, UsePublicInterface } from '@app/decorators/public.decorator';
import { LoginCodeDto } from './user.dto';
import { LocationAxisParam, } from './user.param';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }


    // 注册接口，无需进行登录验证
    // @UsePublicInterface()
    // @Post('register')
    // public async registerUser(@Body() registerInfo: RegisterUserDto) {
    //     const { unionid, openid } = registerInfo;
    //     return await this.userService.registerUser(unionid, openid);
    // }

    // 用户登录接口
    @UsePublicInterface()
    @Post('login')
    public userLogin(@Body() loginInfo: LoginCodeDto) {
        return this.userService.login(loginInfo);
    }

    // 用户注销
    @UseLoginAccessInterface()
    @Post('cancel')
    public userLogout(@User() userInfo: IPayLoad) {
        const { id } = userInfo;
        return this.userService.cancelUser(id);
    }

    // 查询用户自身主信息
    @UseLoginAccessInterface()
    @Get('profile')
    public userProfile(@User() userInfo: IPayLoad) {
        // console.log('userInfo是',userInfo)
        const { id } = userInfo;
        return this.userService.queryUserProfile(id);
    }

    //根据经纬度获取用户信息的具体位置
    @UseLoginAccessInterface()
    @Post('location')
    public getLocation(@User() userInfo: IPayLoad, @Body() locationAxisParam: LocationAxisParam) {
        const { id } = userInfo;
        return this.userService.queryCityApi(id, locationAxisParam);
    }

}
