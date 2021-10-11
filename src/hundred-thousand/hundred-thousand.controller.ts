import { Controller, Get } from '@nestjs/common';
import { UuidResDto } from '../common/dtos/uuid.res.dto';
import { HundredThousandService } from './hundred-thousand.service';

@Controller('hundred-thousand')
export class HundredThousandController {
  constructor(private readonly hundredThousandService: HundredThousandService) {}

  @Get('create-one')
  async createOne(): Promise<UuidResDto> {
    const hundredThousand = await this.hundredThousandService.createOne();

    return { uuid: hundredThousand.uuid };
  }

  @Get('create-batch')
  async createBatch() {
    return await this.hundredThousandService.createBatch();
  }

  @Get('count')
  async getCount() {
    return await this.hundredThousandService.getCount();
  }
}
