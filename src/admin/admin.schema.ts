import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from "./admin.type"
import * as jwt from 'jsonwebtoken';
import { ROLES } from 'src/shared/constants';


const AdminUserSchema = new mongoose.Schema({
    role: { type: String, default: ROLES.ADMIN },
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    password: String,
    gender: String,
    image: String,
    isActive: { type: Boolean, default: true },
    isKYC: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    deviceId: String,
    createdIp: String,
    createdBy: [{ type: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" } }],
    updatedIp: String,
    updatedBy: [{ type: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" } }],
}, { timestamps: true })





AdminUserSchema.methods.generateJWT = function (extra = {}): string {
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
};





AdminUserSchema.pre("save", async function (next: mongoose.HookNextFunction) {


    if (this['password'] && this.isModified('password')) {
        this['password'] = await bcrypt.hash(this['password'], +process.env.SALT_ROUND)
    }
    next();
});


AdminUserSchema.methods.comparePassword = async function (password): Promise<boolean> {
    return bcrypt.compare(password, this.password)
};


export { AdminUserSchema };