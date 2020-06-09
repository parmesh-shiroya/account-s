import { IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsBoolean, Length, IsIn, isNotEmpty, IsNumber, IsNumberString, isBoolean } from "class-validator";
import { ROLES } from "src/shared/constants";




export class InsertInstituteDTO {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsPhoneNumber("IN")
    mobile: string
    @IsOptional()
    @IsNotEmpty()
    phone: string
    @IsNotEmpty()
    address: string
    landmark: string
    city: string
    state: string
    country: string
    @IsNotEmpty()
    pincode: string
    @IsOptional()
    @IsBoolean()
    isEncrypted: boolean
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
    @Length(8, 30)
    password: string
    @IsNotEmpty()
    gender: string
}


export class UpdateInstituteDTO {
    @IsOptional()
    @IsNotEmpty()
    name?: string
    @IsOptional()
    @IsNotEmpty()
    phone?: string
    @IsOptional()
    @IsNotEmpty()
    mobile?: string
    @IsOptional()
    @IsNotEmpty()
    logo?: string
    @IsOptional()
    @IsNotEmpty()
    address?: string
    @IsOptional()
    @IsNotEmpty()
    state?: string
    @IsOptional()
    @IsNotEmpty()
    city?: string
    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    pincode?: string
    @IsOptional()
    @IsNotEmpty()
    happyClients?: any
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isEncrypted?: boolean
    @IsOptional()
    @IsNotEmpty()
    isVerified?: boolean
    @IsOptional()
    @IsNotEmpty()
    isActive?: boolean
}



export class InsertInstituteUserDTO {
    instituteId?: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsPhoneNumber("IN")
    mobile: string
    @IsNotEmpty()
    @IsIn([ROLES.INSTITUTE_ADMIN])
    role?: ROLES
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
    @Length(8, 30)
    password: string
    @IsNotEmpty()
    gender: string
}

export class UpdateInstituteUserDTO {
    @IsOptional()
    @IsNotEmpty()
    mobile?: string
    @IsOptional()
    @IsNotEmpty()
    firstName?: string
    @IsOptional()
    @IsNotEmpty()
    lastName?: string
    @IsOptional()
    @IsNotEmpty()
    password?: string
    @IsOptional()
    @IsNotEmpty()
    @IsIn(['MALE', 'FEMALE'])
    gender?: string
    @IsOptional()
    @IsNotEmpty()
    @IsIn([ROLES.INSTITUTE_ADMIN])
    role?: ROLES
    @IsOptional()
    @IsNotEmpty()
    education?: string[]
    @IsOptional()
    @IsNotEmpty()
    acchievement?: string[]
    @IsOptional()
    @IsNotEmpty()
    isActive?: boolean
    @IsOptional()
    @IsNotEmpty()
    isOwner?: boolean
}



export class LoginInstituteDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: string
}