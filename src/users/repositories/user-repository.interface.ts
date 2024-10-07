// repositories/user-repository.interface.ts
import { User } from '../../entities';
import { CreateUserDto } from '../dto/create-user.dto';

interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(createUserDto: CreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
const USER_REPOSITORY: string = 'USER_REPOSITORY';

export { IUserRepository, USER_REPOSITORY };
