import { Document, Schema as MSchema } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
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
    state: string;
    @Prop()
    city: string;
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
    generateJWT = function (extra = {}): string {
        return jwt.sign(
            {
                _id: this.id,
                instituteId: this.instituteId,
                email: this.email,
                role: this.role,
                ...extra
            },
            process.env.SECRET,
            { expiresIn: '365d' }
        );
    };
    comparePassword = async function (password): Promise<boolean> {
        return bcrypt.compare(password, this.password)
    };
}






export const InstituteSchema = SchemaFactory.createForClass(Institute)
export const InstituteUserSchema = SchemaFactory.createForClass(InstituteUser)

