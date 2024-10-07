import { User } from '../../entities';
import { CreateUserDto } from '../dto/create-user.dto';

interface IUserService {
  findByEmail(email: string): Promise<User | undefined>;
  create(createUserDto: CreateUserDto): Promise<User>;
}

export { IUserService };
