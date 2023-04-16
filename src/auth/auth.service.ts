import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User')
     private  userModel: Model<User>,
     private  jwtService: JwtService
     ){}


    async signUp(signUpDto: SignUpDto): Promise<{ token: string}> {
      const { name, email, password } = signUpDto;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      const token = this.jwtService.sign({ id: user._id})
      
      return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token }>{
      const { email, password } = loginDto;

      const user = await this.userModel.findOne({email})

      if(!user){
            throw new UnauthorizedException('Invalid email or password')
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password)

     if(!isPasswordMatched){
      throw new UnauthorizedException('Invalid email or password')
     }

     const token = this.jwtService.sign({ id: user._id});

     return { token };

    }

    async getUsers():Promise<User[]>{
      const Users = await this.userModel.find()
      return Users;
  }

}
