import { Module } from '@nestjs/common';
import { FiftyThousandController } from './fifty-thousand.controller';
import { FiftyThousandService } from './fifty-thousand.service';

@Module({
  controllers: [FiftyThousandController],
  providers: [FiftyThousandService],
})
export class FiftyThousandModule {}
