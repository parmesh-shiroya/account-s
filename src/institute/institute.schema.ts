import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'


const InstituteRole = new mongoose.Schema({
    title: String,
    isActive: { type: Boolean, default: true },
}, { timestamps: true })

const Institute = new mongoose.Schema({
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


const InstituteUser = new mongoose.Schema({
    instituteId: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    instituteRoleId: { type: mongoose.Schema.Types.ObjectId, ref: "InstituteRole", autopopulate: { select: ["title", "isActive"] } },
    mobile: String,
    gender: String,
    education: String,
    acchievement: String,
    isActive: { type: Boolean, default: false },
    isOwener: { type: Boolean, default: false },
    createdIp: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" },
    updatedIp: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" },
}, { timestamps: true })


InstituteUser.plugin(require('mongoose-autopopulate'))



InstituteUser.methods.generateJWT = function (extra = {}): string {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            role: this.instituteRoleId.title,
            ...extra
        },
        process.env.SECRET,
        { expiresIn: '365d' }
    );
};





InstituteUser.pre("save", async function (next: mongoose.HookNextFunction) {


    if (this['password'] && this.isModified('password')) {
        this['password'] = await bcrypt.hash(this['password'], +process.env.SALT_ROUND)
    }
    next();
});


InstituteUser.methods.comparePassword = async function (password): Promise<boolean> {
    return bcrypt.compare(password, this.password)
};

export { InstituteRole, Institute, InstituteUser };