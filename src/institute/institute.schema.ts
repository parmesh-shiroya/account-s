import { Document, Schema as MSchema } from 'mongoose';

import { ROLES } from 'src/shared/constants';
import { AdminUser } from 'src/admin/admin.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class Institute extends Document {
    @Prop()
    name: string;
    @Prop()
    code: string;
    @Prop()
    email: string;
    @Prop()
    mobile: string;
    @Prop()
    phone: string;
    @Prop()
    logo: string;
    @Prop()
    address: string;
    @Prop()
    landmark: string;
    @Prop({ default: "Surat" })
    city: string;


    @Prop({ default: "Gujarat" })
    state: string;

    @Prop({ default: "IN" })
    country: string;
    @Prop()
    pincode: string;
    @Prop({ type: MSchema.Types.Mixed })
    happyClients: any;
    @Prop({ default: false })
    isEncrypted: boolean;
    @Prop({ default: false })
    isVerified: boolean;
    @Prop({ default: true })
    isActive: boolean;
    @Prop()
    createdIp: string;
    @Prop({ type: MSchema.Types.ObjectId, ref: AdminUser.name })
    createdBy: string;
    @Prop()
    updatedIp: string;
    @Prop({ type: MSchema.Types.ObjectId, ref: AdminUser.name })
    updatedBy: string;
}

@Schema({ timestamps: true })
export class InstituteUser extends Document {
    @Prop({ type: MSchema.Types.ObjectId, ref: Institute.name })
    instituteId: string;
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop({ default: ROLES.INSTITUTE_ADMIN })
    role: ROLES;
    @Prop()
    mobile: string;
    @Prop()
    gender: string;
    @Prop()
    image: string;
    @Prop({ type: [String] })
    education: string[];
    @Prop({ type: [String] })
    acchievement: string[];
    @Prop({ default: true })
    isActive: boolean;
    @Prop({ default: false })
    isOwner: boolean;
    @Prop()
    createdIp: string;
    @Prop({ type: MSchema.Types.ObjectId, ref: AdminUser.name })
    createdBy: string;
    @Prop()
    updatedIp: string;
    @Prop({ type: MSchema.Types.ObjectId, ref: AdminUser.name })
    updatedBy: string;
    generateJWT: (extra?: object) => any;

    comparePassword: (password: string) => any;
}






export const InstituteSchema = SchemaFactory.createForClass(Institute)
export const InstituteUserSchema = SchemaFactory.createForClass(InstituteUser)

