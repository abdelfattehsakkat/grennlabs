import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LabSessionDocument = LabSession & Document;

@Schema({ timestamps: true })
export class LabSession {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  labId: string;

  @Prop({ type: [Number], default: [] })
  completedSteps: number[];

  @Prop()
  completedAt: Date;

  @Prop({ default: '' })
  notes: string;
}

export const LabSessionSchema = SchemaFactory.createForClass(LabSession);
