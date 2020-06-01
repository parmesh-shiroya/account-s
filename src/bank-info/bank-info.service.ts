import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankInfo } from './bank-info.type';
import { InsertBankInfoDTO, UpdateBankInfoDTO } from './bank-info.dto';

@Injectable()
export class BankInfoService {
    constructor(@InjectModel("BankInfo") private readonly bankInfoModel: Model<BankInfo>) { }

    async insert(insertBankInfoDto: InsertBankInfoDTO) {
        return await new this.bankInfoModel(insertBankInfoDto).save();
    }
    async getOne(filter: object = {}) {
        const bankInfo = await this.bankInfoModel.findOne(filter);
        if (!bankInfo)
            throw new NotFoundException("Could not bank info")
        return bankInfo;
    }

    async getAll(filter: object = {}) {
        return await this.bankInfoModel.find(filter);
    }

    async update(id: string, updateBankInfoDto: UpdateBankInfoDTO) {
        let bankInfo = await this.getOne({ _id: id })
        let update = Object.assign(bankInfo, updateBankInfoDto)
        return await update.save();
    }
}
