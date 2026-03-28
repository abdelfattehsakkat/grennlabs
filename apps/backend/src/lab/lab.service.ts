import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LabSession, LabSessionDocument } from './lab-session.schema';

@Injectable()
export class LabService {
  constructor(@InjectModel(LabSession.name) private labModel: Model<LabSessionDocument>) {}

  async completeStep(userId: string, labId: string, stepIndex: number, notes?: string) {
    let session = await this.labModel.findOne({ userId: new Types.ObjectId(userId), labId });
    if (!session) {
      session = await this.labModel.create({
        userId: new Types.ObjectId(userId),
        labId,
        completedSteps: [],
      });
    }

    if (!session.completedSteps.includes(stepIndex)) {
      session.completedSteps.push(stepIndex);
    }
    if (notes !== undefined) session.notes = notes;

    const totalSteps = { 'lab-01': 4, 'lab-02': 3 };
    const total = totalSteps[labId] || 0;
    if (session.completedSteps.length >= total && !session.completedAt) {
      session.completedAt = new Date();
    }

    await session.save();
    return session;
  }

  async getSession(userId: string, labId: string) {
    return this.labModel.findOne({ userId: new Types.ObjectId(userId), labId }).exec();
  }

  async getAllSessions() {
    return this.labModel
      .find()
      .populate('userId', 'email nom prenom role')
      .sort({ updatedAt: -1 })
      .exec();
  }
}
