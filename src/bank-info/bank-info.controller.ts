import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { BankInfoService } from './bank-info.service';
import { InsertBankInfoDTO, UpdateBankInfoDTO } from './bank-info.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { CheckAccess, Roles } from 'src/shared/roles.decorator';
import { ROLES, ID_TYPE } from 'src/shared/constants';

@Controller()
export class BankInfoController {
    constructor(private readonly bankInfoService: BankInfoService) { }

    @Post("user/:userId/bank-info")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async insert(@Body() insertBankInfoDto: InsertBankInfoDTO) {
        return await this.bankInfoService.insert(insertBankInfoDto)
    }

    @Get("user/:userId/bank-info")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    async getAll() {
        return await this.bankInfoService.getAll()
    }

    @Get("user/:userId/bank-info/:id")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    async getOne(@Param('id') id: string) {
        return await this.bankInfoService.getOne({ _id: id })
    }

    @Patch("user/:userId/bank-info/:id")
    @CheckAccess("params.userId", ID_TYPE.USER)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() updateBankInfoDto: UpdateBankInfoDTO) {
        return await this.bankInfoService.update(id, updateBankInfoDto)
    }

    // Institute's Path

    @Post("institute/:insId/bank-info")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async insertForIns(@Body() insertBankInfoDto: InsertBankInfoDTO) {
        return await this.bankInfoService.insert(insertBankInfoDto)
    }

    @Get("institute/:insId/bank-info")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    async getAllForIns() {
        return await this.bankInfoService.getAll()
    }

    @Get("institute/:insId/bank-info/:id")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    async getOneForIns(@Param('id') id: string) {
        return await this.bankInfoService.getOne({ _id: id })
    }

    @Patch("institute/:insId/bank-info/:id")
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateForIns(@Param('id') id: string, @Body() updateBankInfoDto: UpdateBankInfoDTO) {
        return await this.bankInfoService.update(id, updateBankInfoDto)
    }
}
