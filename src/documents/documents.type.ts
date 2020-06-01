import { Document } from 'mongoose'

export interface Documents extends Document {
    type: string,
    files: any[],
    isverified: boolean,
    note: string,
    fileData: any,
    extra: any,
    ownerId: string,
    ownerType: string,
    state: string,
    isEncrypted: boolean,
    isActive: boolean,
    createdIp: string,
    updatedIp: string
}