import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { ROLES } from 'src/shared/constants';



@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ type: MSchema.Types.ObjectId, ref: "Institute" })
    instituteId: string;

    @Prop()
    name: string;
    @Prop()
    mobile: string;
    @Prop()
    image: string;
    @Prop()
    email: string;
    @Prop({ default: false })
    isMobileVerified: boolean;
    @Prop({ default: true })
    isActive: boolean;
    @Prop({ default: false })
    isBlocked: boolean;
    @Prop()
    note: string;
    @Prop()
    dob: string;
    @Prop()
    city: string;

    @Prop({ default: "Gujarat" })
    state: string;
    @Prop({ default: "IN" })
    country: string;
    @Prop()
    address: string;
    @Prop()
    pincode: string;
    @Prop()
    createdIp: string;
    @Prop({ type: MSchema.Types.ObjectId, ref: "InstituteUser" })
    createdBy: string;
    @Prop()
    updatedIp: string;
    @Prop({ type: MSchema.Types.ObjectId, ref: "InstituteUser" })
    updatedBy: string;
    @Prop()
    fcmToken: string;

    createdAt: string;
    updatedAt: string;
    generateJWT = function (extra = {}): string {
        return jwt.sign(
            {
                _id: this.id,
                mobile: this.mobile,
                email: this.email,
                instituteId: this.instituteId,
                ...extra,
                role: ROLES.USER,

            },
            process.env.SECRET,
            { expiresIn: '365d' }
        );
    }
}






export const UserSchema = SchemaFactory.createForClass(User)