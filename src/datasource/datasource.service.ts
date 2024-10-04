import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { defaultConfig } from '../config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DataSourceService implements OnModuleInit {
  constructor(
    private readonly configService?: ConfigService,
    private datasource?: DataSource,
  ) {}

  onModuleInit() {
    const sourceData: DataSourceOptions = {
      ...(this.configService
        ? this.configService.get<any>('typeorm')
        : defaultConfig.typeorm),
    };

    this.datasource = new DataSource(sourceData);

    return this.datasource;
  }
}
