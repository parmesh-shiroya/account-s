import { IsMongoId, IsEmail, IsPhoneNumber, IsNotEmpty, Length, IsOptional, IsIn } from "class-validator";
import { ROLES } from "src/shared/constants";


export class InsertAdminDTO {
    // @IsNotEmpty()
    // role: ROLES

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
    @IsIn(['MALE', 'FEMALE'])
    gender: string
    @IsOptional()
    @IsNotEmpty()
    @IsIn([ROLES.ADMIN])
    role?: ROLES
}

export class LoginAdminDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: string
}

export class UpdateAdminDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsIn([ROLES.ADMIN])
    role?: ROLES
    @IsOptional()
    @IsNotEmpty()
    firstName?: string
    @IsOptional()
    @IsNotEmpty()
    lastName?: string
    @IsOptional()
    @IsNotEmpty()
    @IsIn(['MALE', 'FEMALE'])
    gender?: string
    @IsOptional()
    @IsNotEmpty()
    mobile?: string
    @IsOptional()
    @IsNotEmpty()
    isActive?: boolean
    @IsOptional()
    @IsNotEmpty()
    isBlocked?: boolean
}