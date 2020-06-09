import { IsNotEmpty, IsOptional, IsMongoId } from "class-validator"


export class InsertDocumentDTO {
    @IsNotEmpty()
    type?: string
    files?: any[]
    @IsOptional()
    @IsNotEmpty()
    isverified?: boolean

    note?: string
    @IsOptional()
    @IsNotEmpty()
    fileData?: any

    extra?: any
    ownerId?: string
    ownerType?: string
    @IsOptional()
    @IsNotEmpty()
    state?: string
    @IsOptional()
    @IsNotEmpty()
    isEncrypted?: boolean
    @IsOptional()
    @IsNotEmpty()
    isActive?: boolean
    createdIp?: string
    updatedIp?: string
}


export class UpdateDocumentDTO {

    @IsOptional()
    @IsNotEmpty()
    type?: string
    @IsOptional()
    @IsNotEmpty()
    files?: any[]
    @IsOptional()
    @IsNotEmpty()
    isverified?: boolean
    @IsOptional()
    @IsNotEmpty()
    note?: string
    @IsOptional()
    @IsNotEmpty()
    fileData?: any
    extra?: any
    state?: string
    @IsOptional()
    @IsNotEmpty()
    isEncrypted?: boolean
    @IsOptional()
    @IsNotEmpty()
    isActive?: boolean
    createdIp?: string
    updatedIp?: string
}