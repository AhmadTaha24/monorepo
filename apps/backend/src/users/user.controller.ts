
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @HttpCode(HttpStatus.OK)
    @Post('create')
    createUser(@Body() createUserData) {
        this.userService.createUser(createUserData).then(user => user);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    findOne(@Request() req) {
        return req.user
    }
}