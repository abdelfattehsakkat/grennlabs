import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuizSessionDocument = QuizSession & Document;

@Schema({ timestamps: true })
export class QuizSession {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  quizId: string;

  @Prop({ type: [Object], default: [] })
  answers: { questionIndex: number; selectedIndex: number }[];

  @Prop({ default: 0 })
  score: number;

  @Prop()
  completedAt: Date;
}

export const QuizSessionSchema = SchemaFactory.createForClass(QuizSession);
