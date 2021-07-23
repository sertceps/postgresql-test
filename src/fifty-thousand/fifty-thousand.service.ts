import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../common/constants/gender';
import { FiftyThousandEntity } from '../entities/fifty-thousand.entity';

@Injectable()
export class FiftyThousandService implements OnModuleInit {
  constructor(
    @InjectRepository(FiftyThousandEntity)
    private readonly fiftyThousandRepository: Repository<FiftyThousandEntity>
  ) {}

  async onModuleInit() {
    console.log('fifty-thousand-service');
    const totalCounts = 50000;
    const totalRows = await this.fiftyThousandRepository.count();
    const oneBatch = 5000;
    const diff = totalCounts - totalRows;
    if (diff === 0) return console.log(`已满${totalCounts}条`);
    if (diff > 0) {
      const mod = diff % oneBatch;
      const circles = Math.floor(diff / oneBatch);
      const entity = new FiftyThousandEntity();
      entity.name = '测试';
      entity.age = 0;
      entity.gender = Gender.Male;
      for (let i = 0; i < circles; i++) {
        const rowList = [];
        for (let i = 0; i < oneBatch; i++) {
          rowList.push(entity);
        }
        await this.fiftyThousandRepository.save(rowList);
        console.log('插入一批');
      }
      const rowList = [];
      for (let i = 0; i < mod; i++) {
        rowList.push(entity);
      }
      await this.fiftyThousandRepository.save(rowList);
    } else {
      const mod = -diff % oneBatch;
      const circles = Math.floor(-diff / oneBatch);
      for (let i = 0; i < circles; i++) {
        const rowList = await this.fiftyThousandRepository.createQueryBuilder('ten_thousands').limit(oneBatch).getMany();
        Promise.all(
          rowList.map(async item => {
            this.fiftyThousandRepository.delete(item.uuid);
          })
        );
      }
      const rowList = await this.fiftyThousandRepository.createQueryBuilder('ten_thousands').limit(mod).getMany();
      Promise.all(
        rowList.map(async item => {
          this.fiftyThousandRepository.delete(item.uuid);
        })
      );
    }
  }

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
