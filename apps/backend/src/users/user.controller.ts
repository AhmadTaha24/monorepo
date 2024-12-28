
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  createUser(@Body() createUserData) {
    console.log("user", createUserData)
     this.userService.createUser(createUserData).then( user => {return "Created"});
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  findOne(@Request() req) {
    console.log(req.user)
    return req.user
  }
}