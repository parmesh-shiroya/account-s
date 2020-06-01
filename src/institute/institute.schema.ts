import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { ROLES } from 'src/shared/constants';

const InstituteSchema = new mongoose.Schema({
    name: String,
    code: String,
    email: String,
    mobile: String,
    phone: String,
    logo: String,
    address: String,
    state: String,
    city: String,
    pincode: String,
    happyClients: mongoose.Schema.Types.Mixed,
    isEncrypted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdIp: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" },
    updatedIp: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" },
}, { timestamps: true })


const InstituteUserSchema = new mongoose.Schema({
    instituteId: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: { type: String, default: ROLES.INSTITUTE_ADMIN },
    mobile: String,
    gender: String,
    image: String,
    education: [String],
    acchievement: [String],
    isActive: { type: Boolean, default: false },
    isOwner: { type: Boolean, default: false },
    createdIp: String,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedIp: String,
    updatedBy: mongoose.Schema.Types.ObjectId,
}, { timestamps: true })


InstituteUserSchema.plugin(require('mongoose-autopopulate'))



InstituteUserSchema.methods.generateJWT = function (extra = {}): string {
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





InstituteUserSchema.pre("save", async function (next: mongoose.HookNextFunction) {


    if (this['password'] && this.isModified('password')) {
        this['password'] = await bcrypt.hash(this['password'], +process.env.SALT_ROUND)
    }
    next();
});


InstituteUserSchema.methods.comparePassword = async function (password): Promise<boolean> {
    return bcrypt.compare(password, this.password)
};

export { InstituteSchema, InstituteUserSchema };