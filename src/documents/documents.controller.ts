import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { InsertDocumentDTO, UpdateDocumentDTO } from './documents.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { ID_TYPE, ROLES } from 'src/shared/constants';
import { CheckAccess, Roles } from 'src/shared/roles.decorator';

@Controller()
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post('user/:userId/documents')
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async insert(@Body() insertDocumentDto: InsertDocumentDTO) {
        return await this.documentsService.insert(insertDocumentDto)
    }

    @Get("user/:userId/documents")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    async getAll() {
        return await this.documentsService.getAll()
    }

    @Get("user/:userId/documents/:id")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    async getOne(@Param('id') id: string) {
        return await this.documentsService.getOne({ _id: id })
    }

    @Patch("user/:userId/documents/:id")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDTO) {
        return await this.documentsService.update(id, updateDocumentDto)
    }

    // Institute APIS

    @Post('institute/:insId/documents')
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async insertForIns(@Body() insertDocumentDto: InsertDocumentDTO) {
        return await this.documentsService.insert(insertDocumentDto)
    }

    @Get("institute/:insId/documents")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    async getAllForIns() {
        return await this.documentsService.getAll()
    }

    @Get("institute/:insId/documents/:id")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    async getOneForIns(@Param('id') id: string) {
        return await this.documentsService.getOne({ _id: id })
    }

    @Patch("institute/:insId/documents/:id")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateForIns(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDTO) {
        return await this.documentsService.update(id, updateDocumentDto)
    }
}
