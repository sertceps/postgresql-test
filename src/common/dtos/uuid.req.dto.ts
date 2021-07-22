import { IsUUID } from 'class-validator';

export class UuidReqDto {
  @IsUUID('4', { message: 'uuid 格式不正确' })
  uuid: string;
}
