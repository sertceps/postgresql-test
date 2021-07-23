import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../common/constants/gender';
import { HundredThousandEntity } from '../entities/hundred-thousand.entity';

@Injectable()
export class HundredThousandService {
  @InjectRepository(HundredThousandEntity)
  private readonly hundredThousandRepository: Repository<HundredThousandEntity>;

  async findOneByUuid(uuid: string): Promise<HundredThousandEntity> {
    return this.hundredThousandRepository.findOne(uuid);
  }

  async createOne(name: string, age?: number, gender?: Gender, description?: string): Promise<HundredThousandEntity> {
    const hundredThousand = new HundredThousandEntity();
    hundredThousand.name = name;
    if (age) hundredThousand.age = age;
    if (gender) hundredThousand.gender = gender;
    if (description) hundredThousand.description = description;

    return this.hundredThousandRepository.save(hundredThousand);
  }
}
