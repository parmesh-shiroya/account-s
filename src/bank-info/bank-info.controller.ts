import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { BankInfoService } from './bank-info.service';
import { InsertBankInfoDTO, UpdateBankInfoDTO } from './bank-info.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';

@Controller('bank-info')
export class BankInfoController {
    constructor(private readonly bankInfoService: BankInfoService) { }

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    async insert(@Body() insertBankInfoDto: InsertBankInfoDTO) {
        return await this.bankInfoService.insert(insertBankInfoDto)
    }

    @Get()
    @UseGuards(new AuthGuard())
    async getAll() {
        return await this.bankInfoService.getAll()
    }

    @Get(":id")
    @UseGuards(new AuthGuard())
    async getOne(@Param('id') id: string) {
        return await this.bankInfoService.getOne({ _id: id })
    }

    @Patch(":id")
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() updateBankInfoDto: UpdateBankInfoDTO) {
        return await this.bankInfoService.update(id, updateBankInfoDto)
    }
}
