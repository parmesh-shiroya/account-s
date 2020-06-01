import { Document } from 'mongoose'
import { AdminUser } from '../admin/admin.type'
import { ROLES } from 'src/shared/constants'




export interface Institute extends Document {
    name: string,
    code: string,
    email: string,
    mobile: string,
    phone: string,
    logo: string,
    address: string,
    state: string,
    city: string,
    pincode: string,
    happyClients?: any,
    isEncrypted: boolean,
    isverified: boolean,
    isActive: boolean,
    createdIp: string,
    createdBy: AdminUser,
    updatedIp: string,
    updatedBy: AdminUser,
}

export interface InstituteUser extends Document {
    instituteId: string | Institute,
    firstName: string,
    lastName: string,
    email: string,
    role: ROLES,
    mobile: string,
    gender: string,
    education?: string[],
    acchievement?: string[],
    isActive: boolean,
    isOwner: boolean,
    image?: string,
    createdIp: string,
    createdBy: string,
    updatedIp: string,
    updatedBy: string
}
export interface InstituteUserInterface extends InstituteUser {
    generateJWT: (extra?: object) => string
    comparePassword: (password: string) => Promise<boolean>
}
