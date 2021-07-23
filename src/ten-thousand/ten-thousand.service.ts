import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../common/constants/gender';
import { TenThousandEntity } from '../entities/ten-thousand.entity';

@Injectable()
export class TenThousandService {
  constructor(
    @InjectRepository(TenThousandEntity)
    private readonly tenThousandEntityRepository: Repository<TenThousandEntity>
  ) {}

  async findOneByUuid(uuid: string): Promise<TenThousandEntity> {
    return this.tenThousandEntityRepository.findOne(uuid);
  }

  async createOne(name: string, age?: number, gender?: Gender, description?: string): Promise<TenThousandEntity> {
    const tenThousand = new TenThousandEntity();
    tenThousand.name = name;
    if (age) tenThousand.age = age;
    if (gender) tenThousand.gender = gender;
    if (description) tenThousand.description = description;

    return this.tenThousandEntityRepository.save(tenThousand);
  }
}
