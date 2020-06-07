import { Document as MDocument, Schema as MSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema({ timestamps: true })
export class Document extends MDocument {
    @Prop()
    type: string;
    @Prop({ type: [MSchema.Types.Mixed] })
    files: any;
    @Prop({ default: false })
    isverified: boolean;
    @Prop()
    note: string;
    @Prop({ type: MSchema.Types.Mixed })
    fileData: any;
    @Prop({ type: MSchema.Types.Mixed })
    extra: any;
    @Prop({ type: MSchema.Types.ObjectId })
    ownerId: string;
    @Prop()
    ownerType: string;
    @Prop()
    state: string;
    @Prop({ default: false })
    isEncrypted: boolean;
    @Prop({ default: true })
    isActive: boolean;
    @Prop()
    createdIp: string;
    @Prop()
    updatedIp: string;
}



export const DocumentsSchema = SchemaFactory.createForClass(Document)
