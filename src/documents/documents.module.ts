import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsSchema, Document } from './documents.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Document.name, schema: DocumentsSchema }])],
  controllers: [DocumentsController],
  providers: [DocumentsService]
})
export class DocumentsModule { }
