import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenThousandModule } from './ten-thousand/ten-thousand.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import {databaseConfig} from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
	    isGlobal: true,
	    load: [databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigType<typeof databaseConfig>) => ({
        type: config.type as 'postgres',
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.pass,
        database: config.database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [databaseConfig.KEY]
    }),
    TenThousandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
