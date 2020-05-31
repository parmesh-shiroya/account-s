import { IsMongoId, IsEmail, IsPhoneNumber, IsNotEmpty, Length } from "class-validator";


export class InsertAdminDTO {
    @IsNotEmpty()
    @IsMongoId()
    adminRoleId: string
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsPhoneNumber("IN")
    mobile: string
    @IsNotEmpty()
    @Length(8, 30)
    password: string
    @IsNotEmpty()
    gender: string

}

export class LoginAdminDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: string
}

export class UpdateAdminDTO {
    adminRoleId?: string
    firstName?: string
    lastName?: string
    gender?: string
    mobile?: string
    isActive?: boolean
    isBlocked?: boolean
}