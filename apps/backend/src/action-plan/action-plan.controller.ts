import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ActionPlanService } from './action-plan.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('action-plan')
@UseGuards(JwtAuthGuard)
export class ActionPlanController {
  constructor(private service: ActionPlanService) {}

  @Post()
  save(@Body() body: any, @CurrentUser() user: any) {
    return this.service.save(user.sub, body);
  }

  @Get()
  get(@CurrentUser() user: any) {
    return this.service.get(user.sub);
  }
}
