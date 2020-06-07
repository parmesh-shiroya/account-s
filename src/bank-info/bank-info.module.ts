import { Module } from '@nestjs/common';
import { BankInfoService } from './bank-info.service';
import { BankInfoController } from './bank-info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BankInfoSchema, BankInfo } from './bank-info.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BankInfo.name, schema: BankInfoSchema }])],
  providers: [BankInfoService],
  controllers: [BankInfoController]
})
export class BankInfoModule { }
