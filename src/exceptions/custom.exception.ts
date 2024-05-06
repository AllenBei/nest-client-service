import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class CustomException extends HttpException {
    constructor(response: string | Record<string, any>, status: number = HttpStatus.OK) {
        super(response, status);
    }
}
