import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AdminUserInterface, AdminRole } from "./admin.type"
import { InsertAdminDTO, LoginAdminDTO, UpdateAdminDTO } from './admin.dto';



@Injectable()
export class AdminService {
    constructor(
        @InjectModel('AdminUser') private readonly adminUserModel: Model<AdminUserInterface>,
        @InjectModel('AdminRole') private readonly adminRoleModel: Model<AdminRole>
    ) { }

    async insert(insertAdminDTO: InsertAdminDTO) {
        let admin = await this.adminUserModel.findOne({ email: insertAdminDTO.email })
        if (admin) {
            throw new BadRequestException('Email already exist')
        }
        return await new this.adminUserModel(insertAdminDTO).save()
    }

    async getOne(filter: object = {}) {
        const admin = await this.adminUserModel.findOne(filter);
        if (!admin) {
            throw new NotFoundException("Could not find person")
        }
        return admin
    }

    async getAll(filter: object = {}) {
        return await this.adminUserModel.find(filter);
    }

    async update(adminId: string, updateAdminDto: UpdateAdminDTO) {
        let admin = await this.getOne({ _id: adminId })
        let update = Object.assign(admin, updateAdminDto)
        return await update.save();
    }

    async login(loginAdminDTO: LoginAdminDTO) {
        let admin = await this.adminUserModel.findOne({ email: loginAdminDTO.email, isActive: true, isBlocked: false });
        if (!admin || !(await admin.comparePassword(loginAdminDTO.password))) {
            throw new BadRequestException("Invalid email/password")
        }
        return {
            id: admin.id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            mobile: admin.mobile,
            gender: admin.gender,
            image: admin.image,
            role: admin.adminRoleId.title,
            token: admin.generateJWT(),
        }
    }
}
