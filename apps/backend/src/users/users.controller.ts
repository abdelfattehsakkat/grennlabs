import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
@Roles('admin')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch(':id/activer')
  activer(@Param('id') id: string) {
    return this.usersService.setActif(id, true);
  }

  @Patch(':id/desactiver')
  desactiver(@Param('id') id: string) {
    return this.usersService.setActif(id, false);
  }
}
