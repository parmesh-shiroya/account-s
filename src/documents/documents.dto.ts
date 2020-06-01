import { IsNotEmpty, IsOptional, IsMongoId } from "class-validator"


export class InsertDocumentDTO {
    @IsNotEmpty()
    type?: string
    files?: any[]
    isverified?: boolean
    note?: string
    fileData?: any
    extra?: any
    ownerId?: string
    ownerType?: string
    state?: string
    isEncrypted?: boolean
    isActive?: boolean
    createdIp?: string
    updatedIp?: string
}


export class UpdateDocumentDTO {

    type?: string
    files?: any[]
    isverified?: boolean
    note?: string
    fileData?: any
    extra?: any
    state?: string
    isEncrypted?: boolean
    isActive?: boolean
    createdIp?: string
    updatedIp?: string
}