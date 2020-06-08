import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { InsertDocumentDTO, UpdateDocumentDTO } from './documents.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { ID_TYPE, ROLES } from 'src/shared/constants';
import { CheckAccess, Roles } from 'src/shared/roles.decorator';
import { User } from 'src/users/users.schema';
import { Institute } from 'src/institute/institute.schema';

@Controller()
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post('user/:userId/documents')
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async insert(@Param('userId') userId: string, @Body() insertDocumentDto: InsertDocumentDTO) {
        insertDocumentDto.ownerId = userId
        insertDocumentDto.ownerType = User.name
        return await this.documentsService.insert(insertDocumentDto)
    }

    @Get("user/:userId/documents")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    async getAll(@Param('userId') userId: string, ) {
        return await this.documentsService.getAll({ ownerId: userId, ownerType: User.name })
    }

    @Get("user/:userId/documents/:id")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    async getOne(@Param('id') id: string, @Param('userId') userId: string) {
        return await this.documentsService.getOne({ _id: id, ownerId: userId, ownerType: User.name })
    }

    @Patch("user/:userId/documents/:id")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async update(@Param('userId') userId: string, @Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDTO) {
        return await this.documentsService.update({ _id: id, ownerId: userId, ownerType: User.name }, updateDocumentDto)
    }

    // Institute APIS

    @Post('institute/:insId/documents')
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async insertForIns(@Param('insId') insId: string, @Body() insertDocumentDto: InsertDocumentDTO) {
        insertDocumentDto.ownerId = insId;
        insertDocumentDto.ownerType = Institute.name
        return await this.documentsService.insert(insertDocumentDto)
    }

    @Get("institute/:insId/documents")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    async getAllForIns(@Param('insId') insId: string) {
        return await this.documentsService.getAll({ ownerId: insId, ownerType: Institute.name })
    }

    @Get("institute/:insId/documents/:id")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    async getOneForIns(@Param('insId') insId: string, @Param('id') id: string) {
        return await this.documentsService.getOne({ _id: id, ownerId: insId, ownerType: Institute.name })
    }

    @Patch("institute/:insId/documents/:id")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateForIns(@Param('insId') insId: string, @Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDTO) {
        return await this.documentsService.update({ _id: id, ownerId: insId, ownerType: Institute.name }, updateDocumentDto)
    }
}
