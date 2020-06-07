import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { InsertInstituteUserDTO, UpdateInstituteUserDTO, LoginInstituteDTO } from './institute.dto';
import { InstituteUser } from './institute.schema';

@Injectable()
export class InstituteUserService {
    constructor(
        @InjectModel(InstituteUser.name) private readonly instituteUserModel: Model<InstituteUser>,
    ) { }

    async insert(insertInstituteUserDTO: InsertInstituteUserDTO) {
        let institute = await this.instituteUserModel.findOne({ $or: [{ email: insertInstituteUserDTO.email }] })
        if (institute) {
            throw new BadRequestException('User already exist')
        }
        return await new this.instituteUserModel(InsertInstituteUserDTO).save()
    }
    async getOne(filter: object = {}) {
        const instituteUser = await this.instituteUserModel.findOne(filter)
        if (!instituteUser)
            throw new NotFoundException("Could not find user")
        return instituteUser
    }
    async getAll(filter: object = {}) {
        return await this.instituteUserModel.find(filter)
    }
    async update(id: string, updateInstituteUserDTO: UpdateInstituteUserDTO) {
        let instituteUser = await this.getOne({ _id: id })
        let update = Object.assign(instituteUser, updateInstituteUserDTO)
        return await update.save();
    }

    async login(loginInstituteDTO: LoginInstituteDTO) {
        let user = await this.instituteUserModel.findOne({ email: loginInstituteDTO.email, isActive: true });
        if (!user || !(await user.comparePassword(loginInstituteDTO.password))) {
            throw new BadRequestException("Invalid email/password")
        }
        return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            gender: user.gender,
            image: user.image,
            role: user.role,
            education: user.education,
            acchievement: user.acchievement,
            token: user.generateJWT(),
        }
    }
}
