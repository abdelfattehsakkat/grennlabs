import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QuizModule } from './quiz/quiz.module';
import { LabModule } from './lab/lab.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { ActionPlanModule } from './action-plan/action-plan.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://greenit_admin:dev_password@localhost:27022/greenit?authSource=admin'),
    AuthModule,
    UsersModule,
    QuizModule,
    LabModule,
    EvaluationModule,
    ActionPlanModule,
    ResourcesModule,
  ],
})
export class AppModule {}
