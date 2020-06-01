import { IsNotEmpty, IsOptional, IsMongoId } from "class-validator"



export class InsertBankInfoDTO {
    @IsNotEmpty()
    bankName: string
    @IsNotEmpty()
    acNo: string
    @IsNotEmpty()
    acType: string
    @IsNotEmpty()
    ifscCode: string
    @IsOptional()
    @IsMongoId()
    @IsNotEmpty()
    ownerId?: string
    @IsOptional()
    @IsNotEmpty()
    ownerType?: string
}

export class UpdateBankInfoDTO {
    bankName?: string
    acNo?: string
    acType?: string
    ifscCode?: string
    ownerType?: string
    isVerified?: boolean
    isActive?: boolean
    updatedIp?: string
}