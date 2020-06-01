import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Institute } from "./institute.type"
import { InsertInstituteDTO } from './institute.dto';
import { UpdateAdminDTO } from 'src/admin/admin.dto';
@Injectable()
export class InstituteService {
    constructor(
        @InjectModel('Institute') private readonly instituteModel: Model<Institute>
    ) { }


    async getOne(filter: object = {}) {
        const institute = await this.instituteModel.findOne(filter)
        if (!institute)
            throw new NotFoundException("Could not find person")
        return institute
    }

    async getAll(filter: object = {}) {
        return await this.instituteModel.find(filter)
    }
    async insert(instituteDTO: InsertInstituteDTO) {
        let filter: any[] = [{ email: instituteDTO.email }, { mobile: instituteDTO.mobile }]
        if (instituteDTO.phone) {
            filter.push({ phone: instituteDTO.phone })
        }
        let institute = await this.instituteModel.findOne({ $or: filter });
        if (institute) {
            throw new BadRequestException('Institute already exist')
        }
        return await new this.instituteModel(instituteDTO).save()
    }

    async update(id: string, updateInstituteDto: UpdateAdminDTO) {
        let institute = await this.getOne({ _id: id })
        let update = Object.assign(institute, updateInstituteDto)
        return await update.save();
    }

}
