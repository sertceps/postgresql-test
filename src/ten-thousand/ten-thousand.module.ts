import { Module } from '@nestjs/common';
import { TenThousandController } from './ten-thousand.controller';
import { TenThousandService } from './ten-thousand.service';

@Module({
  controllers: [TenThousandController],
  providers: [TenThousandService],
})
export class TenThousandModule {}
