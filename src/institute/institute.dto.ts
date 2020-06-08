import { IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsBoolean, Length } from "class-validator";
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
    name?: string
    phone?: string
    mobile?: string
    logo?: string
    address?: string
    state?: string
    city?: string
    pincode?: string
    happyClients?: any
    isEncrypted?: boolean
    isVerified?: boolean
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
    firstName: string
    @IsNotEmpty()
    lastName: string
    @Length(8, 30)
    password: string
    @IsNotEmpty()
    gender: string
}

export class UpdateInstituteUserDTO {
    mobile?: string
    firstName?: string
    lastName?: string
    password?: string
    gender?: string
    role?: ROLES
    education?: string[]
    acchievement?: string[]
    isActive?: boolean
    isOwner?: boolean
}



export class LoginInstituteDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: string
}