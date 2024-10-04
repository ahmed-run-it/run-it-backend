import { defaultConfig } from './configuration';

export type Config = typeof defaultConfig;
export type AppConfig = typeof defaultConfig.app;
export type ApiConfig = typeof defaultConfig.api;
export type TypeOrmConfig = typeof defaultConfig.typeorm;
