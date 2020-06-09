import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { User, UserRefrence } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InsertUserDTO, UpdateUserDTO, UserLoginDTO, UserRefrenceDTO } from './users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(UserRefrence.name) private userRefrenceModel: Model<UserRefrence>) { }

    async insert(insertUserDTO: InsertUserDTO) {
        const user = await this.userModel.findOne({ mobile: insertUserDTO.mobile })
        if (user) {
            throw new BadRequestException("User already exists")
        }
        return await new this.userModel(insertUserDTO).save();
    }
    async login(mobileNo: string, fcmToken: string) {
        const user = await this.userModel.findOne({ mobileNo })
        if (user) {
            if (fcmToken) {
                user.fcmToken = fcmToken
                user.save()
            }
            return user.generateJWT();
        }
        return new NotFoundException("User not found")
    }
    async getOne(filter: object = {}) {
        const user = await this.userModel.findOne(filter)
        if (!user)
            throw new NotFoundException("User not found")
        return user
    }


    async getAll(filter: object = {}) {
        return await this.userModel.find()
    }

    async update(id: String, userData: UpdateUserDTO) {
        let user = await this.getOne({ _id: id })
        let update = Object.assign(user, userData)
        return await update.save()
    }


    async getUserRefrence(userId: string) {
        return await this.userRefrenceModel.findOne({ userId: userId })

    }

    async upsertUserRefrence(userId: string, userRefrenceData: UserRefrenceDTO) {
        return await this.userRefrenceModel.findOneAndUpdate({ userId: userId }, {
            $set: userRefrenceData
        }, { new: true, upsert: true })

    }
}
