import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'user123', description: 'Username for login' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password for login' })
  @IsString()
  password: string;
}
