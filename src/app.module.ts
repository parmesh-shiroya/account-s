import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { InstituteModule } from './institute/institute.module';
import { BankInfoModule } from './bank-info/bank-info.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [AdminModule, MongooseModule.forRoot(process.env.MONGO_URL, { useNewUrlParser: true }), InstituteModule, BankInfoModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
