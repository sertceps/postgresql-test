import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HundredThousandEntity } from '../entities/hundred-thousand.entity';
import { HundredThousandController } from './hundred-thousand.controller';
import { HundredThousandService } from './hundred-thousand.service';

@Module({
  imports: [TypeOrmModule.forFeature([HundredThousandEntity])],
  controllers: [HundredThousandController],
  providers: [HundredThousandService],
})
export class HundredThousandModule {}
