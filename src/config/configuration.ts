import * as dotenv from 'dotenv';
dotenv.config();
const configPath = process.env.SERVER_DEPLOY
  ? '.env'
  : `./src/envs/.env.${process.env.NODE_ENV}`;
dotenv.config({ path: configPath });

export const defaultConfig = {
  env: process.env.NODE_ENV,
  app: {
    name: process.env.PROJECT_NAME,
    port: process.env.PORT,
    deployed: process.env.SERVER_DEPLOY,
    secure: process.env.SECURE_AUTHENTICATION,
  },
  api: {
    url: process.env.URL_API,
  },
  // databaseUrl: process.env.DATABASE_URL,
  typeorm: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.SYNCHRONIZE === 'true',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    logging: process.env.NODE_ENV !== 'production' ? ['error'] : false,
    migrations: [__dirname + '/../migrations/**/*.ts'],
    migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
    migrationsRun: process.env.RUN_MIGRATIONS === 'true',
    cli: {
      migrationsDir: '/../migrations/**/*.ts',
    },
  },
};

export const config = () => {
  return defaultConfig;
};
