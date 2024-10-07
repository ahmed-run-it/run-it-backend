import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repositories/user.repository';
import { USER_REPOSITORY } from './repositories/user-repository.interface'; // Token

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    UserRepository, // Assure-toi que UserRepository est bien ici
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UsersModule {}
