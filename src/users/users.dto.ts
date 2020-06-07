import { IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsBoolean, Length } from "class-validator";

export class InsertUserDTO {
    instituteId: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    mobile: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    city: string;
    pincode: string;
    panNo: string;
}

export class UserRefrenceDTO {

}


export class UserLoginDTO {
    @IsNotEmpty()
    fToken: string
    fcmToken?: string
    // @IsNotEmpty()
    // mobileNo: string
}

export class UpdateUserDTO {
    institute: string;
    name: string;
    mobile: string;
    image: string;
    email: string;
    isMobileVerified: boolean;
    isActive: boolean;
    isBlocked: boolean;
    note: string;
    dob: string;
    city: string;
    state: string;
    country: string;
    address: string;
    pincode: string;
    updatedIp: string;
    updatedBy: string;
    panNo: string;

}
