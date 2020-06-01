import * as mongoose from 'mongoose';


const BankInfoSchema = new mongoose.Schema({
    bankName: String,
    acNo: String,
    acType: String,
    ifscCode: String,
    ownerId: mongoose.Schema.Types.ObjectId,
    ownerType: String,
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdIp: String,
    updatedIp: String,
}, { timestamps: true })


export { BankInfoSchema }