
import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class SignUpDto{
    
    @IsNotEmpty({message: 'this email is required'})
    @IsString()
    readonly name: string;

    @IsEmail({}, {message :'please enter correct  email'})
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty({message: 'the password is required'})
    @IsString()
    @MinLength(6)
    @MaxLength(15)
    readonly password: string;
    readonly createAt: Date;
}
