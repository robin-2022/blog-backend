import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength, IsEmail, IsNotEmpty } from "class-validator";


export class LoginDto {
    
    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required'})
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @MinLength(4)
    @MaxLength(12)
    @IsNotEmpty({ message: 'Password is required'})
    readonly password: string
}
