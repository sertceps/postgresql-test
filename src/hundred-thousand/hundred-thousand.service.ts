import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../common/constants/gender';
import { HundredThousandEntity } from '../entities/hundred-thousand.entity';

@Injectable()
export class HundredThousandService implements OnModuleInit {
  @InjectRepository(HundredThousandEntity)
  private readonly hundredThousandRepository: Repository<HundredThousandEntity>;

  async onModuleInit() {
    console.log('hundred-thousand-service skipped');
    // const before = process.hrtime.bigint();
    // for (let i = 0; i < 100000; i++) {
    //   const name = '测试' + i;
    //   const age = 0;
    //   const school = '清华实验小学' + i;
    //   const address = '南极洲北方公园十三层502室' + i;
    //   const city = '中原五百日清县';
    //   const description = '欢迎外星人和我做朋友' + i;
    //   await this.createOne(name, age, Gender.Male, description, school, address, city);
    // }
    // const after = process.hrtime.bigint() - before;
    // console.log(after);
    // const totalCounts = 100000;
    // const totalRows = await this.hundredThousandRepository.count();
    // const oneBatch = 10000;
    // const diff = totalCounts - totalRows;
    // if (diff === 0) return console.log(`已满${totalCounts}条`);
    // if (diff > 0) {
    //   const mod = diff % oneBatch;
    //   const circles = Math.floor(diff / oneBatch);
    //   const entity = new HundredThousandEntity();
    //   entity.name = '测试';
    //   entity.age = 0;
    //   entity.gender = Gender.Male;
    //   for (let i = 0; i < circles; i++) {
    //     const rowList = [];
    //     for (let i = 0; i < oneBatch; i++) {
    //       rowList.push(entity);
    //     }
    //     await this.hundredThousandRepository.save(rowList);
    //     console.log('插入一批');
    //   }
    //   const rowList = [];
    //   for (let i = 0; i < mod; i++) {
    //     rowList.push(entity);
    //   }
    //   await this.hundredThousandRepository.save(rowList);
    // } else {
    //   const mod = -diff % oneBatch;
    //   const circles = Math.floor(-diff / oneBatch);
    //   for (let i = 0; i < circles; i++) {
    //     const rowList = await this.hundredThousandRepository.createQueryBuilder('ten_thousands').limit(oneBatch).getMany();
    //     Promise.all(
    //       rowList.map(async item => {
    //         this.hundredThousandRepository.delete(item.uuid);
    //       })
    //     );
    //   }
    //   const rowList = await this.hundredThousandRepository.createQueryBuilder('ten_thousands').limit(mod).getMany();
    //   Promise.all(
    //     rowList.map(async item => {
    //       this.hundredThousandRepository.delete(item.uuid);
    //     })
    //   );
    // }
  }

  async findOneByUuid(uuid: string): Promise<HundredThousandEntity> {
    return this.hundredThousandRepository.findOne(uuid);
  }

  async createOne(
    name: string,
    age?: number,
    gender?: Gender,
    description?: string,
    school?: string,
    address?: string,
    city?: string
  ): Promise<HundredThousandEntity> {
    const hundredThousand = new HundredThousandEntity();
    hundredThousand.name = name;
    if (age) hundredThousand.age = age;
    if (gender) hundredThousand.gender = gender;
    if (description) hundredThousand.description = description;
    if (school) hundredThousand.school = school;
    if (address) hundredThousand.address = address;
    if (city) hundredThousand.city = city;

    return this.hundredThousandRepository.save(hundredThousand);
  }
}
