import { User } from '../../entities';
import { CreateUserDto } from '../dto/create-user.dto';

interface IUserController {
  create(createUserDto: CreateUserDto): Promise<User>;
}

export { IUserController };
