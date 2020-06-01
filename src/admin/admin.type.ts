import { Document } from 'mongoose'
import { ROLES } from 'src/shared/constants';



export interface AdminUser extends Document {
    role: ROLES,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    password: string,
    gender: string,
    image: string,
    isActive: boolean,
    isKYC: boolean,
    isBlocked: boolean,
    deviceId: string,
    createdIp: string,
    createdBy: AdminUser,
    updatedIp: string,
    updatedBy: AdminUser,
}

export interface AdminUserInterface extends AdminUser {
    generateJWT: (extra?: object) => string
    comparePassword: (password: string) => Promise<boolean>
}
