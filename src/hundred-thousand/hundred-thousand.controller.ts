import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrUpdateReqDto } from '../common/dtos/create-or-update.req.dto';
import { CreateOrUpdateResDto } from '../common/dtos/create-or-update.res.dto';
import { UuidReqDto } from '../common/dtos/uuid.req.dto';
import { UuidResDto } from '../common/dtos/uuid.res.dto';
import { HundredThousandService } from './hundred-thousand.service';

@Controller('hundred-thousand')
export class HundredThousandController {
  constructor(private readonly hundredThousandService: HundredThousandService) {}

  @Get(':uuid')
  async findOneByUuid(@Param() { uuid }: UuidReqDto): Promise<CreateOrUpdateResDto> {
    return this.hundredThousandService.findOneByUuid(uuid);
  }

  @Post()
  async createOne(@Body() body: CreateOrUpdateReqDto): Promise<UuidResDto> {
    const hundredThousand = await this.hundredThousandService.createOne(body.name, body.age, body.gender, body.description);

    return { uuid: hundredThousand.uuid };
  }
}
