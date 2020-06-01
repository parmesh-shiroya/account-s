import { Module } from '@nestjs/common';
import { BankInfoService } from './bank-info.service';
import { BankInfoController } from './bank-info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BankInfoSchema } from './bank-info.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "BankInfo", schema: BankInfoSchema }])],
  providers: [BankInfoService],
  controllers: [BankInfoController]
})
export class BankInfoModule { }
