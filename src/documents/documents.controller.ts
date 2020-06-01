import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { InsertDocumentDTO, UpdateDocumentDTO } from './documents.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    async insert(@Body() insertDocumentDto: InsertDocumentDTO) {
        return await this.documentsService.insert(insertDocumentDto)
    }

    @Get()
    @UseGuards(new AuthGuard())
    async getAll() {
        return await this.documentsService.getAll()
    }

    @Get(":id")
    @UseGuards(new AuthGuard())
    async getOne(@Param('id') id: string) {
        return await this.documentsService.getOne({ _id: id })
    }

    @Patch(":id")
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDTO) {
        return await this.documentsService.update(id, updateDocumentDto)
    }
}
