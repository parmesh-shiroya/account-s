import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { InsertDocumentDTO, UpdateDocumentDTO } from './documents.dto';
import { Document } from './documents.schema';

@Injectable()
export class DocumentsService {
    constructor(@InjectModel(Document.name) private readonly documentsModel: Model<Document>) { }

    async insert(insertDocument: InsertDocumentDTO) {
        return await new this.documentsModel(insertDocument).save()
    }

    async getOne(filter: object = {}) {
        const document = await this.documentsModel.findOne(filter)
        if (!document)
            throw new NotFoundException("Could not document")
        return document
    }
    async getAll(filter: object = {}) {
        return await this.documentsModel.find({ filter })
    }
    async update(filter: object, updateDocumentDto: UpdateDocumentDTO) {
        let document = await this.getOne(filter)
        let update = Object.assign(document, updateDocumentDto)
        return await update.save();
    }
}
