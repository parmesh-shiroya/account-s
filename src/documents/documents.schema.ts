import * as mongoose from 'mongoose';

const DocumentsSchema = new mongoose.Schema({
    type: String,
    files: [mongoose.Schema.Types.Mixed],
    isverified: { type: Boolean, default: false },
    note: String,
    fileData: mongoose.Schema.Types.Mixed,
    extra: mongoose.Schema.Types.Mixed,
    ownerId: mongoose.Schema.Types.ObjectId,
    ownerType: String,
    state: String,
    isEncrypted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdIp: String,
    updatedIp: String,
})


export { DocumentsSchema }