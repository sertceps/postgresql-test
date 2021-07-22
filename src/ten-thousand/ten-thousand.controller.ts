import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrUpdateReqDto } from '../common/dtos/create-or-update.req.dto';
import { UuidReqDto } from '../common/dtos/uuid.req.dto';
import { TenThousandService } from './ten-thousand.service';

@Controller('ten-thousand')
export class TenThousandController {
  constructor(private readonly tenThousandService: TenThousandService) {}

  @Get(':uuid')
  async findOneByUuid(@Param() { uuid }: UuidReqDto) {
    return await this.tenThousandService.findOneByUuid(uuid);
  }

  @Post()
  async createOne(@Body() body: CreateOrUpdateReqDto) {
    return await this.tenThousandService.createOne(body.name, body.age, body.gender, body.description);
  }
}
