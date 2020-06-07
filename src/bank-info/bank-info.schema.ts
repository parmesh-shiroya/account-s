import { Document, Schema as MSchema } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class BankInfo extends Document {
    @Prop()
    bankName: string;

    @Prop()
    acNo: string;
    @Prop()
    acType: string;
    @Prop()
    ifscCode: string;
    @Prop({ type: MSchema.Types.ObjectId })
    ownerId: string;
    @Prop()
    ownerType: string;
    @Prop({ default: false })
    isVerified: { type: Boolean; default: false };
    @Prop({ default: true })
    isActive: boolean;
    @Prop()
    createdIp: string;
    @Prop()
    updatedIp: string;
}

export const BankInfoSchema = SchemaFactory.createForClass(BankInfo)

