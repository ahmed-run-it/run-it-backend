import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';
import { IUserController } from './user.controller.interface';

@ApiTags('User')
@Controller('user')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create User' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
