// services/user.service.ts
import { Injectable, Logger, Inject } from '@nestjs/common';
import { User } from '../../entities';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../repositories/user-repository.interface';
import { generateException } from 'src/shared/exceptions/api.exception';

@Injectable()
export class UserService {
  private readonly logger: Logger;

  constructor(
    @Inject(USER_REPOSITORY) // Utiliser le token ici
    private readonly userRepository: IUserRepository,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findByEmail(email);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const serviceName = this.create.name;
    try {
      const newUser = await this.userRepository.create(createUserDto);
      return this.userRepository.save(newUser);
    } catch (error) {
      throw generateException(error, serviceName, this.logger);
    }
  }
}
