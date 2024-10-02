import * as dotenv from 'dotenv';
import { DataSourceService } from './datasource.service';

dotenv.config();

const configPath = process.env.SERVER_DEPLOY
  ? '.env'
  : `./src/envs/.env.${process.env.NODE_ENV}`;
dotenv.config({ path: configPath });

const source = new DataSourceService();

export default source.onModuleInit();
