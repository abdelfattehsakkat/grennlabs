import { Controller, Get, Post, Param, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsNumber() questionIndex: number;
  @IsNumber() selectedIndex: number;
}

class SubmitQuizDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}

@Controller('quiz')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get(':id')
  getMeta(@Param('id') id: string) {
    const quiz = this.quizService.getQuizMeta(id);
    if (!quiz) throw new NotFoundException('Quiz introuvable');
    return quiz;
  }

  @Post(':id/submit')
  submit(@Param('id') id: string, @Body() dto: SubmitQuizDto, @CurrentUser() user: any) {
    return this.quizService.submit(user.sub, id, dto.answers);
  }

  @Get('sessions/me')
  mySessions(@CurrentUser() user: any) {
    return this.quizService.getSessionsByUser(user.sub);
  }

  @Get('sessions/all')
  @Roles('formateur', 'admin')
  allSessions() {
    return this.quizService.getAllSessions();
  }
}
