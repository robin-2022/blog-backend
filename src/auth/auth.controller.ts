import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth/Login/Register')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string}>{
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string}>{
    return this.authService.login(loginDto);
  }


  @Get('/users')
  async getUsers(){
      const users = await this.authService.getUsers();
      return users
  }
}

