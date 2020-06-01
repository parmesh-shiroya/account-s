import { IsMongoId, IsEmail, IsPhoneNumber, IsNotEmpty, Length } from "class-validator";
import { ROLES } from "src/shared/constants";


export class InsertAdminDTO {
    @IsNotEmpty()
    role: ROLES
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
    role?: ROLES
    firstName?: string
    lastName?: string
    gender?: string
    mobile?: string
    isActive?: boolean
    isBlocked?: boolean
}