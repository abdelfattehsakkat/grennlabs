import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
