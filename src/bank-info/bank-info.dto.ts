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
    @IsOptional()
    @IsNotEmpty()
    bankName?: string
    @IsOptional()
    @IsNotEmpty()
    acNo?: string
    @IsOptional()
    @IsNotEmpty()
    acType?: string
    @IsOptional()
    @IsNotEmpty()
    ifscCode?: string
    @IsOptional()
    @IsNotEmpty()
    ownerType?: string
    @IsOptional()
    @IsNotEmpty()
    isVerified?: boolean
    @IsOptional()
    @IsNotEmpty()
    isActive?: boolean
    updatedIp?: string
}