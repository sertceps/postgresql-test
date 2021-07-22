import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Gender } from '../constants/gender';

export class CreateOrUpdateReqDto {
  @MaxLength(35, { message: '姓名长度超出限制' })
  name: string;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: '年龄格式不正确' })
  @Type(() => Number)
  @IsOptional()
  age?: number;

  @IsEnum(Gender, { message: '性别格式不正确' })
  @IsOptional()
  gender?: Gender;

  @MaxLength(150, { message: '个人介绍长度超出限制' })
  @IsOptional()
  description?: string;
}
