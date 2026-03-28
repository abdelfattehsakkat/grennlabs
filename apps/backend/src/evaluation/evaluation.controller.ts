import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { IsNumber, IsString, IsOptional, Min, Max, IsIn } from 'class-validator';

class RotiDto {
  @IsNumber() @Min(1) @Max(5) score: number;
  @IsOptional() @IsString() commentaire?: string;
}

class FormationDto {
  ratings: { contenu: number; formateur: number; exercices: number; utilite: number; plateforme: number };
  @IsOptional() @IsString() plusAppris?: string;
  @IsOptional() @IsString() aApprofondir?: string;
  @IsOptional() @IsIn(['oui', 'non', 'peut-etre']) recommanderait?: string;
}

@Controller('evaluation')
@UseGuards(JwtAuthGuard)
export class EvaluationController {
  constructor(private evaluationService: EvaluationService) {}

  @Post('roti')
  roti(@Body() dto: RotiDto, @CurrentUser() user: any) {
    return this.evaluationService.submitRoti(user.sub, dto.score, dto.commentaire || '');
  }

  @Post('formation')
  formation(@Body() dto: FormationDto, @CurrentUser() user: any) {
    return this.evaluationService.submitFormation(user.sub, dto);
  }

  @Get('stats')
  @Roles('formateur', 'admin')
  stats() {
    return this.evaluationService.getStats();
  }
}
