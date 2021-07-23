import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiftyThousandEntity } from '../entities/fifty-thousand.entity';
import { FiftyThousandController } from './fifty-thousand.controller';
import { FiftyThousandService } from './fifty-thousand.service';

@Module({
  imports: [TypeOrmModule.forFeature([FiftyThousandEntity])],
  controllers: [FiftyThousandController],
  providers: [FiftyThousandService],
})
export class FiftyThousandModule {}
