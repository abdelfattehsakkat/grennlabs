import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { LabService } from './lab.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { IsNumber, IsOptional, IsString } from 'class-validator';

class CompleteStepDto {
  @IsNumber() stepIndex: number;
  @IsOptional() @IsString() notes?: string;
}

@Controller('lab')
@UseGuards(JwtAuthGuard)
export class LabController {
  constructor(private labService: LabService) {}

  @Post(':id/step')
  completeStep(@Param('id') id: string, @Body() dto: CompleteStepDto, @CurrentUser() user: any) {
    return this.labService.completeStep(user.sub, id, dto.stepIndex, dto.notes);
  }

  @Get(':id/session')
  getSession(@Param('id') id: string, @CurrentUser() user: any) {
    return this.labService.getSession(user.sub, id);
  }

  @Get('sessions/all')
  @Roles('formateur', 'admin')
  allSessions() {
    return this.labService.getAllSessions();
  }
}
