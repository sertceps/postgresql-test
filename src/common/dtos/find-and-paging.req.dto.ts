import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FindAndPagingReqDto {
  @IsNotEmpty({ message: '页码不能为空' })
  @Type(() => Number)
  page_index: number;

  @IsNotEmpty({ message: '每页大小不能为空' })
  @Type(() => Number)
  page_size: number;

  @Type(() => Date)
  start: Date;

  @Type(() => Date)
  end: Date;

  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;
}
