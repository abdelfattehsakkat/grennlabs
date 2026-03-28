import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  STAGIAIRE = 'stagiaire',
  FORMATEUR = 'formateur',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ enum: UserRole, default: UserRole.STAGIAIRE })
  role: UserRole;

  @Prop({ default: true })
  actif: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
