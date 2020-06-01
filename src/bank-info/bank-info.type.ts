import { Document } from 'mongoose'

export interface BankInfo extends Document {
    bankName: string,
    acNo: string,
    acType: string,
    ifscCode: string,
    ownerId: string,
    ownerType: string,
    isVerified: boolean,
    isActive: boolean,
    createdIp: string,
    updatedIp: string
}