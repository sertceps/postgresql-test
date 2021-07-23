import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../common/constants/gender';
import { FiftyThousandEntity } from '../entities/fifty-thousand.entity';

@Injectable()
export class FiftyThousandService {
  constructor(
    @InjectRepository(FiftyThousandEntity)
    private readonly fiftyThousandRepository: Repository<FiftyThousandEntity>
  ) {}

  async findOneByUuid(uuid: string): Promise<FiftyThousandEntity> {
    return this.fiftyThousandRepository.findOne(uuid);
  }

  async createOne(name: string, age?: number, gender?: Gender, description?: string): Promise<FiftyThousandEntity> {
    const fiftyThousand = new FiftyThousandEntity();
    fiftyThousand.name = name;
    if (age) fiftyThousand.age = age;
    if (gender) fiftyThousand.gender = gender;
    if (description) fiftyThousand.description = description;

    return this.fiftyThousandRepository.save(fiftyThousand);
  }
}
