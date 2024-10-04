import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';

/**
 * DTO for creating a new user.
 * This Data Transfer Object ensures that the required fields are provided
 * when creating a new user and applies validation rules.
 */
export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @Length(1, 50)
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @Length(1, 50)
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  password: string;

  @ApiProperty({ example: 'client', default: 'client' })
  @IsString()
  @IsOptional()
  role?: string = 'client';

  @ApiProperty({
    example: 'MALE',
    enum: ['FEMALE', 'MALE', 'AMBIGUOUS', 'UNKNOWN', 'NOT APPLICABLE', 'OTHER'],
  })
  @IsEnum(['FEMALE', 'MALE', 'AMBIGUOUS', 'UNKNOWN', 'NOT APPLICABLE', 'OTHER'])
  @IsOptional()
  sex?: string;

  @ApiProperty({ example: '+123456789', nullable: true })
  @IsString()
  @Length(1, 15)
  @IsOptional()
  mobile_phone?: string;
}
