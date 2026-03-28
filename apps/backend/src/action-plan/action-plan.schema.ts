import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ActionPlanDocument = ActionPlan & Document;

@Schema({ timestamps: true })
export class ActionPlan {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  role: string;

  @Prop({ type: [Object], default: [] })
  actions: {
    periode: '7j' | '30j';
    action: string;
    critereRGESN: string;
    mesure: string;
  }[];

  @Prop({ default: '' })
  partageEquipe: string;
}

export const ActionPlanSchema = SchemaFactory.createForClass(ActionPlan);
