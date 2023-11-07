import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { Configuration } from 'src/config/configuration';

@Injectable()
export class DbService {
  public readonly sql: postgres.Sql;

  constructor(private readonly configService: ConfigService<Configuration>) {
    this.sql = postgres(this.configService.get('databaseConnectionString'), {
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }
}
