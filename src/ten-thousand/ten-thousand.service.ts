import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../common/constants/gender';
import { TenThousandEntity } from '../entities/ten-thousand.entity';

@Injectable()
export class TenThousandService implements OnModuleInit {
  constructor(
    @InjectRepository(TenThousandEntity)
    private readonly tenThousandEntityRepository: Repository<TenThousandEntity>
  ) {}
  async onModuleInit() {
    console.log('ten-thousand-service');
    const totalCounts = 10000;
    const totalRows = await this.tenThousandEntityRepository.count();
    const oneBatch = 1000;
    const diff = totalCounts - totalRows;
    if (diff === 0) return console.log(`已满${totalCounts}条`);
    if (diff > 0) {
      const mod = diff % oneBatch;
      const circles = Math.floor(diff / oneBatch);
      const entity = new TenThousandEntity();
      entity.name = '测试';
      entity.age = 0;
      entity.gender = Gender.Male;
      for (let i = 0; i < circles; i++) {
        const rowList = [];
        for (let i = 0; i < oneBatch; i++) {
          rowList.push(entity);
        }
        await this.tenThousandEntityRepository.save(rowList);
        console.log('插入一批');
      }
      const rowList = [];
      for (let i = 0; i < mod; i++) {
        rowList.push(entity);
      }
      await this.tenThousandEntityRepository.save(rowList);
    } else {
      const mod = -diff % oneBatch;
      const circles = Math.floor(-diff / oneBatch);
      for (let i = 0; i < circles; i++) {
        const rowList = await this.tenThousandEntityRepository.createQueryBuilder('ten_thousands').limit(oneBatch).getMany();
        Promise.all(
          rowList.map(async item => {
            this.tenThousandEntityRepository.delete(item.uuid);
          })
        );
      }
      const rowList = await this.tenThousandEntityRepository.createQueryBuilder('ten_thousands').limit(mod).getMany();
      Promise.all(
        rowList.map(async item => {
          this.tenThousandEntityRepository.delete(item.uuid);
        })
      );
    }
  }

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
