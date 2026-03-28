import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizSession, QuizSessionSchema } from './quiz-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QuizSession.name, schema: QuizSessionSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET || 'dev_secret' }),
  ],
  providers: [QuizService],
  controllers: [QuizController],
  exports: [QuizService],
})
export class QuizModule {}
