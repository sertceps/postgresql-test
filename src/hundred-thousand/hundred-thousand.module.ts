import { Module } from '@nestjs/common';
import { HundredThousandController } from './hundred-thousand.controller';
import { HundredThousandService } from './hundred-thousand.service';

@Module({
  controllers: [HundredThousandController],
  providers: [HundredThousandService],
})
export class HundredThousandModule {}
