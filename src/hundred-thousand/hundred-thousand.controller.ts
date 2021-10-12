import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateOrUpdateReqDto } from '../common/dtos/create-or-update.req.dto';
import { FindAndPagingReqDto } from '../common/dtos/find-and-paging.req.dto';
import { UuidResDto } from '../common/dtos/uuid.res.dto';
import { HundredThousandService } from './hundred-thousand.service';

@Controller()
export class HundredThousandController {
  constructor(private readonly hundredThousandService: HundredThousandService) {}

  @Post('create-one')
  async createOne(@Body() body: CreateOrUpdateReqDto): Promise<UuidResDto> {
    const hundredThousand = await this.hundredThousandService.createOne(
      body.name,
      body.age,
      body.school,
      body.gender,
      body.address,
      body.city,
      body.description
    );

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

  @Get('find-and-paging')
  async findAndPaging(@Query() query: FindAndPagingReqDto) {
    const [userList, count] = await this.hundredThousandService.findAndPaging(query.page_index, query.page_size, query.start, query.end, query.name);
    return { data: userList, count };
  }
}
