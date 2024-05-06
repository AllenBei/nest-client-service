import { Reflector } from '@nestjs/core';

/**
 * 为了防止全局的interceptor与filters中在main.ts中注册时，提示没有传入reflector的参数错误，
 * 直接在外面new一个对象作为获取metadata的方法
 */
export const reflector: Reflector = new Reflector();
