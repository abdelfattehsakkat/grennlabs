import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ActionPlan, ActionPlanDocument } from './action-plan.schema';

@Injectable()
export class ActionPlanService {
  constructor(@InjectModel(ActionPlan.name) private model: Model<ActionPlanDocument>) {}

  async save(userId: string, data: any) {
    return this.model.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { ...data, userId: new Types.ObjectId(userId) },
      { upsert: true, new: true },
    );
  }

  async get(userId: string) {
    return this.model.findOne({ userId: new Types.ObjectId(userId) }).exec();
  }
}
