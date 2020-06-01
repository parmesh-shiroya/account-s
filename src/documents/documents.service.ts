import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documents } from './documents.type';
import { InsertDocumentDTO, UpdateDocumentDTO } from './documents.dto';

@Injectable()
export class DocumentsService {
    constructor(@InjectModel("Documents") private readonly documentsModel: Model<Documents>) { }

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
    async update(id: string, updateDocumentDto: UpdateDocumentDTO) {
        let document = await this.getOne({ _id: id })
        let update = Object.assign(document, updateDocumentDto)
        return await update.save();
    }
}
