import { Document, Schema as MSchema } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
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
    @Prop({ default: true })
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
    generateJWT = function (extra = {}): string {
        return jwt.sign(
            {
                _id: this.id,
                email: this.email,
                role: this.role,
                ...extra
            },
            process.env.SECRET,
            { expiresIn: '365d' }
        );
    }
    comparePassword = async function (password): Promise<boolean> {
        return bcrypt.compare(password, this.password)
    }
}

// const AdminUserSchema = new mongoose.Schema({
//     role: { type: String, default: ROLES.ADMIN },
//     firstName: String,
//     lastName: String,
//     email: String,
//     mobile: String,
//     password: String,
//     gender: String,
//     image: String,
//     isActive: { type: Boolean, default: true },
//     isKYC: { type: Boolean, default: false },
//     isBlocked: { type: Boolean, default: false },
//     deviceId: String,
//     createdIp: String,
//     createdBy: [{ type: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" } }],
//     updatedIp: String,
//     updatedBy: [{ type: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" } }],
// }, { timestamps: true })








// AdminUserSchema.pre("save", async function (next: mongoose.HookNextFunction) {


//     if (this['password'] && this.isModified('password')) {
//         this['password'] = await bcrypt.hash(this['password'], +process.env.SALT_ROUND)
//     }
//     next();
// });



export const AdminUserSchema = SchemaFactory.createForClass(AdminUser)


// export { AdminUserSchema };