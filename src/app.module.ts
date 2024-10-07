import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatasourceModule } from './datasource/datasource.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/configuration';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/exceptions/all-exceptions.filter';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatasourceModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
