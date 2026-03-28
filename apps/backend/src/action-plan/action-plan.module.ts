import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ActionPlanService } from './action-plan.service';
import { ActionPlanController } from './action-plan.controller';
import { ActionPlan, ActionPlanSchema } from './action-plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ActionPlan.name, schema: ActionPlanSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET || 'dev_secret' }),
  ],
  providers: [ActionPlanService],
  controllers: [ActionPlanController],
})
export class ActionPlanModule {}
