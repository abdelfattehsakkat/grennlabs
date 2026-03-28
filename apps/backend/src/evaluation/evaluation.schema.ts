import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// ROTI — Return On Time Invested
export type EvaluationRotiDocument = EvaluationRoti & Document;

@Schema({ timestamps: true })
export class EvaluationRoti {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  score: number;

  @Prop({ default: '' })
  commentaire: string;
}

export const EvaluationRotiSchema = SchemaFactory.createForClass(EvaluationRoti);

// Évaluation de la formation
export type EvaluationFormationDocument = EvaluationFormation & Document;

@Schema({ timestamps: true })
export class EvaluationFormation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Object, required: true })
  ratings: {
    contenu: number;
    formateur: number;
    exercices: number;
    utilite: number;
    plateforme: number;
  };

  @Prop({ default: '' })
  plusAppris: string;

  @Prop({ default: '' })
  aApprofondir: string;

  @Prop({ type: String, enum: ['oui', 'non', 'peut-etre'] })
  recommanderait: string;
}

export const EvaluationFormationSchema = SchemaFactory.createForClass(EvaluationFormation);
