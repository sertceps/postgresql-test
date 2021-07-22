import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenThousandEntity } from '../entities/ten-thousand.entity';
import { TenThousandController } from './ten-thousand.controller';
import { TenThousandService } from './ten-thousand.service';

@Module({
  imports: [TypeOrmModule.forFeature([TenThousandEntity])],
  controllers: [TenThousandController],
  providers: [TenThousandService],
})
export class TenThousandModule {}
