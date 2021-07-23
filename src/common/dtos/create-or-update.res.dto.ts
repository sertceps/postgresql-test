import { Gender } from '../constants/gender';

export class CreateOrUpdateResDto {
  name: string;

  age?: number;

  gender?: Gender;

  description?: string;
}
