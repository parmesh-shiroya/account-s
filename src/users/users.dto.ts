import { IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsBoolean, Length, IsNumberString } from "class-validator";

export class InsertUserDTO {
    instituteId: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    mobile: string;
    @IsOptional()
    @IsNotEmpty()
    image: string;
    @IsOptional()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    city: string;
    @IsOptional()
    @IsNotEmpty()
    state: string;
    @IsOptional()
    @IsNotEmpty()
    country: string;
    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    pincode: string;
    @IsOptional()
    @IsNotEmpty()
    panNo: string;
    @IsOptional()
    @IsNotEmpty()
    note: string;
    @IsOptional()
    @IsNotEmpty()
    dob: string;
}

export class UserRefrenceDTO {
    userId: string;
    // @IsOptional()
    // @IsNotEmpty()
    // panNo: string;
    panImage: string;
    @IsOptional()
    @IsNotEmpty()
    aadhaarNo: string;
    aadhaarFrontImage: string;
    aadhaarFrontBack: string;
    @IsOptional()
    @IsNotEmpty()
    gst_in: string;
}


export class UserLoginDTO {
    @IsNotEmpty()
    fToken: string
    fcmToken?: string
    // @IsNotEmpty()
    // mobileNo: string
}

export class UpdateUserDTO {
    @IsOptional()
    @IsNotEmpty()
    institute: string;
    @IsOptional()
    @IsNotEmpty()
    name: string;
    @IsOptional()
    @IsNotEmpty()
    mobile: string;
    @IsOptional()
    @IsNotEmpty()
    image: string;
    @IsOptional()
    @IsNotEmpty()
    email: string;
    @IsOptional()
    @IsNotEmpty()
    isMobileVerified: boolean;
    @IsOptional()
    @IsNotEmpty()
    isActive: boolean;
    @IsOptional()
    @IsNotEmpty()
    isBlocked: boolean;
    @IsOptional()
    @IsNotEmpty()
    note: string;
    @IsOptional()
    @IsNotEmpty()
    dob: string;
    @IsOptional()
    @IsNotEmpty()
    city: string;
    @IsOptional()
    @IsNotEmpty()
    state: string;
    @IsOptional()
    @IsNotEmpty()
    country: string;
    @IsOptional()
    @IsNotEmpty()
    address: string;
    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    pincode: string;
    updatedIp: string;
    updatedBy: string;
    @IsOptional()
    @IsNotEmpty()
    panNo: string;

}
