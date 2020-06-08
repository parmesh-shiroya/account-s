import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { BankInfoService } from './bank-info.service';
import { InsertBankInfoDTO, UpdateBankInfoDTO } from './bank-info.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { CheckAccess, Roles } from 'src/shared/roles.decorator';
import { ROLES, ID_TYPE } from 'src/shared/constants';
import { User } from 'src/users/users.schema';
import { Institute } from 'src/institute/institute.schema';

@Controller()
export class BankInfoController {
    constructor(private readonly bankInfoService: BankInfoService) { }

    @Post("user/:userId/bank-info")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async insert(@Param('userId') userId: string, @Body() insertBankInfoDto: InsertBankInfoDTO) {
        insertBankInfoDto.ownerId = userId;
        insertBankInfoDto.ownerType = User.name;
        return await this.bankInfoService.insert(insertBankInfoDto)
    }

    @Get("user/:userId/bank-info")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    async getAll(@Param('userId') userId: string) {
        return await this.bankInfoService.getAll({ ownerId: userId, ownerType: User.name })
    }

    @Get("user/:userId/bank-info/:id")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    async getOne(@Param('id') id: string, @Param('userId') userId: string) {
        return await this.bankInfoService.getOne({ _id: id, ownerId: userId, ownerType: User.name })
    }

    @Patch("user/:userId/bank-info/:id")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Param('userId') userId: string, @Body() updateBankInfoDto: UpdateBankInfoDTO) {
        return await this.bankInfoService.update({ _id: id, ownerId: userId, ownerType: User.name }, updateBankInfoDto)
    }

    // Institute's Path

    @Post("institute/:insId/bank-info")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async insertForIns(@Param('insId') insId: string, @Body() insertBankInfoDto: InsertBankInfoDTO) {
        insertBankInfoDto.ownerId = insId
        insertBankInfoDto.ownerType = Institute.name

        return await this.bankInfoService.insert(insertBankInfoDto)
    }

    @Get("institute/:insId/bank-info")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    async getAllForIns(@Param('insId') insId: string) {
        return await this.bankInfoService.getAll({ ownerId: insId, ownerType: Institute.name })
    }

    @Get("institute/:insId/bank-info/:id")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    async getOneForIns(@Param('id') id: string, @Param('insId') insId: string) {
        return await this.bankInfoService.getOne({ _id: id, ownerId: insId, ownerType: Institute.name })
    }

    @Patch("institute/:insId/bank-info/:id")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateForIns(@Param('id') id: string, @Param('insId') insId: string, @Body() updateBankInfoDto: UpdateBankInfoDTO) {
        return await this.bankInfoService.update({ _id: id, ownerId: insId, ownerType: Institute.name }, updateBankInfoDto)
    }
}
