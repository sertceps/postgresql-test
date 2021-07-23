import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrUpdateReqDto } from '../common/dtos/create-or-update.req.dto';
import { CreateOrUpdateResDto } from '../common/dtos/create-or-update.res.dto';
import { UuidReqDto } from '../common/dtos/uuid.req.dto';
import { UuidResDto } from '../common/dtos/uuid.res.dto';
import { FiftyThousandService } from './fifty-thousand.service';

@Controller('fifty-thousand')
export class FiftyThousandController {
  constructor(private readonly fiftyThousandService: FiftyThousandService) {}

  @Get(':uuid')
  async findOneByUuid(@Param() { uuid }: UuidReqDto): Promise<CreateOrUpdateResDto> {
    return await this.fiftyThousandService.findOneByUuid(uuid);
  }

  @Post()
  async createOne(@Body() body: CreateOrUpdateReqDto): Promise<UuidResDto> {
    const fiftyThousand = await this.fiftyThousandService.createOne(body.name, body.age, body.gender, body.description);

    return { uuid: fiftyThousand.uuid };
  }
}
