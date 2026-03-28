import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EvaluationRoti, EvaluationRotiDocument, EvaluationFormation, EvaluationFormationDocument } from './evaluation.schema';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectModel(EvaluationRoti.name) private rotiModel: Model<EvaluationRotiDocument>,
    @InjectModel(EvaluationFormation.name) private formationModel: Model<EvaluationFormationDocument>,
  ) {}

  async submitRoti(userId: string, score: number, commentaire: string) {
    return this.rotiModel.create({ userId: new Types.ObjectId(userId), score, commentaire });
  }

  async submitFormation(userId: string, data: any) {
    return this.formationModel.create({ userId: new Types.ObjectId(userId), ...data });
  }

  async getStats() {
    const rotis = await this.rotiModel.find().populate('userId', 'email nom prenom').exec();
    const formations = await this.formationModel.find().populate('userId', 'email nom prenom').exec();

    const avgRoti = rotis.length
      ? (rotis.reduce((s, r) => s + r.score, 0) / rotis.length).toFixed(2)
      : null;

    return { rotis, formations, avgRoti, totalReponses: formations.length };
  }
}
