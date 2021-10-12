import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { HundredThousandModule } from './hundred-thousand/hundred-thousand.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigType<typeof databaseConfig>) => ({
        type: config.type as 'postgres',
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.pass,
        database: config.database,
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [databaseConfig.KEY],
    }),
    HundredThousandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
