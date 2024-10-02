import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Entities from '../entities'; // Assure-toi que ce chemin est correct
import { config } from 'dotenv';
import { environment } from 'src/environments/environement';
config();

class ConfigService {
  constructor(private readonly env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public isProduction() {
    return environment.production;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions & { cli } {
    return {
      type: 'postgres',
      host: this.getValue('TYPEORM_HOST'),
      port: Number(this.getValue('TYPEORM_PORT')),
      username: this.getValue('TYPEORM_USERNAME'),
      password: this.getValue('TYPEORM_PASSWORD'),
      database: this.getValue('TYPEORM_DATABASE'),
      entities: Object.values(Entities),
      migrations: ['dist/migrations/**/*{.ts,.js}'],
      cli: { migrationsDir: 'src/migrations' },
      synchronize: false,
      keepConnectionAlive: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'TYPEORM_HOST',
  'TYPEORM_PORT',
  'TYPEORM_USERNAME',
  'TYPEORM_PASSWORD',
  'TYPEORM_DATABASE',
]);

export { configService };
