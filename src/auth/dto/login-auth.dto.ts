import { MaxLength, MinLength, IsEmail, IsNotEmpty } from "class-validator";


export class LoginDto {
    
    @IsNotEmpty({ message: 'asdasdas'})
    @IsEmail()
    readonly email: string;
    @MinLength(4)
    @MaxLength(12)
    @IsNotEmpty()
    readonly password: string
}
