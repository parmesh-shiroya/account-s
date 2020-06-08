import { Document, Schema as MSchema } from 'mongoose';

import { ROLES } from 'src/shared/constants';
import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class AdminUser extends Document {
    @Prop({ default: ROLES.ADMIN })
    role: ROLES;
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    email: string;
    @Prop()
    mobile: string;
    @Prop()
    password: string;
    @Prop()
    gender: string;
    @Prop()
    image: string;
    @Prop({ default: true })
    isActive: boolean;
    @Prop({ default: false })
    isKYC: boolean;
    @Prop({ default: false })
    isBlocked: boolean;
    @Prop()
    deviceId: string;
    @Prop()
    createdIp: string;

    @Prop({ type: MSchema.Types.ObjectId, ref: AdminUser.name })
    createdBy: string;
    @Prop()
    updatedIp: string;
    // @Prop(raw({
    //     type: { type: String },
    //     id: { type: mongoose.Schema.Types.ObjectId, ref: AdminUser.name }
    // }))
    // updatedBy: Record<string, any>;
    @Prop({ type: MSchema.Types.ObjectId, ref: AdminUser.name })
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    generateJWT: (extra?: object) => any;

    comparePassword: (password: string) => any;
}




export const AdminUserSchema = SchemaFactory.createForClass(AdminUser)


// export { AdminUserSchema };