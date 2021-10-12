import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../common/constants/gender';
import { HundredThousandEntity } from '../entities/hundred-thousand.entity';

@Injectable()
export class HundredThousandService implements OnApplicationBootstrap {
  @InjectRepository(HundredThousandEntity)
  private readonly hundredThousandRepository: Repository<HundredThousandEntity>;

  async onApplicationBootstrap() {
    console.log('data fill is skipped');
  }

  generateEntity(): HundredThousandEntity {
    const entity = new HundredThousandEntity();
    const timestamp = Date.now();

    entity.name = '长门' + timestamp;
    entity.age = 15;
    entity.school = '天天中学';
    entity.gender = Gender.Male;
    entity.address = '南极洲北方公园十三层' + timestamp;
    entity.city = '日清县' + timestamp;
    entity.description = '欢迎外星人和我做朋友' + timestamp;

    return entity;
  }

  async createOne(
    name: string,
    age: number,
    school: string,
    gender: Gender,
    address: string,
    city: string,
    description: string
  ): Promise<HundredThousandEntity> {
    const entity = new HundredThousandEntity();

    entity.name = name;
    entity.age = age;
    entity.school = school;
    entity.gender = gender;
    entity.address = address;
    entity.city = city;
    entity.description = description;

    return this.hundredThousandRepository.save(entity);
  }

  async createBatch() {
    const oneBatch = 1000;
    const rowList = [];
    const entity = this.generateEntity();
    for (let i = 0; i < oneBatch; i++) {
      rowList.push(entity);
    }

    try {
      await this.hundredThousandRepository.save(rowList);
      return { result: true };
    } catch (err) {
      return err;
    }
  }

  async getCount(): Promise<number> {
    return this.hundredThousandRepository.count();
  }

  async findAndPaging(pageIndex, pageSize, start, end, name): Promise<[HundredThousandEntity[], number]> {
    return this.hundredThousandRepository
      .createQueryBuilder('user')
      .where('user.name LIKE :name AND user.created_at >= :start AND user.created_at <= :end', { name: `%${name}%`, start, end })
      .skip(pageIndex * pageSize)
      .take(pageSize)
      .getManyAndCount();
  }
}
