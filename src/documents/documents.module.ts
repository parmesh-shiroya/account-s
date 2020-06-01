import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsSchema } from './documents.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Documents", schema: DocumentsSchema }])],
  controllers: [DocumentsController],
  providers: [DocumentsService]
})
export class DocumentsModule { }
