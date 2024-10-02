import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ApiConfig, AppConfig } from './config/config.types';
import { ConfigService } from '@nestjs/config';
import { defaultConfig } from './config/configuration';
import { PRODUCTION_ENV } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //to do add csurf
  // app.use(csurf());
  app.use(helmet());

  app.use(cookieParser());
  // Configurer Swagger
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  const { port } = config.get<AppConfig>('app');
  const { url } = config.get<ApiConfig>('api');

  const options = new DocumentBuilder()
    .setTitle('@Run it - Documentation - Back')
    .setDescription("La documentation de l'API")
    .setVersion('1.0')
    .addTag('API')
    .build();

  if (defaultConfig.env !== PRODUCTION_ENV) {
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: { persistAuthorization: true, docExpansion: 'none' },
    });
  }
  await app.listen(port, () => {
    Logger.log(`Listening at ${url}:${port}`);
  });
}
bootstrap();
