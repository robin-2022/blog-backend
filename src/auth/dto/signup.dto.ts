import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignUpDto{

    @ApiProperty()
    @IsNotEmpty({message: 'this email is required'})
    @IsString()
    readonly name: string;
    
    @ApiProperty()
    @IsEmail({}, {message :'please enter correct  email'})
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty({message: 'the password is required'})
    @IsString()
    @MinLength(6)
    @MaxLength(15)
    readonly password: string;
    readonly createAt: Date;
}
