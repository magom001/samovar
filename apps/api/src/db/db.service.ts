import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { Configuration } from 'src/config/configuration';

@Injectable()
export class DbService implements OnModuleInit {
  public readonly sql: postgres.Sql<any>;

  constructor(private readonly configService: ConfigService<Configuration>) {
    this.sql = postgres(this.configService.get('databaseConnectionString'), {
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }

  async onModuleInit() {
    await this.sql`SELECT version()`;
  }
}
