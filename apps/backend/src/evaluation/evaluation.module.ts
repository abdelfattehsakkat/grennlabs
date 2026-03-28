import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { EvaluationRoti, EvaluationRotiSchema, EvaluationFormation, EvaluationFormationSchema } from './evaluation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EvaluationRoti.name, schema: EvaluationRotiSchema },
      { name: EvaluationFormation.name, schema: EvaluationFormationSchema },
    ]),
    JwtModule.register({ secret: process.env.JWT_SECRET || 'dev_secret' }),
  ],
  providers: [EvaluationService],
  controllers: [EvaluationController],
})
export class EvaluationModule {}
