import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrUpdateReqDto } from '../common/dtos/create-or-update.req.dto';
import { CreateOrUpdateResDto } from '../common/dtos/create-or-update.res.dto';
import { UuidReqDto } from '../common/dtos/uuid.req.dto';
import { UuidResDto } from '../common/dtos/uuid.res.dto';
import { TenThousandService } from './ten-thousand.service';

@Controller('ten-thousand')
export class TenThousandController {
  constructor(private readonly tenThousandService: TenThousandService) {}

  @Get(':uuid')
  async findOneByUuid(@Param() { uuid }: UuidReqDto): Promise<CreateOrUpdateResDto> {
    return await this.tenThousandService.findOneByUuid(uuid);
  }

  @Post()
  async createOne(@Body() body: CreateOrUpdateReqDto): Promise<UuidResDto> {
    const tenThousand = await this.tenThousandService.createOne(body.name, body.age, body.gender, body.description);

    return { uuid: tenThousand.uuid };
  }
}
