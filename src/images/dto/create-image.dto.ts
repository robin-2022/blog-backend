import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class BlogDto {
 
 
  @ApiProperty()
  @IsNotEmpty({ message: 'title is required'})
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'description is required'})
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'filename is required'})
  filename: string;
}
