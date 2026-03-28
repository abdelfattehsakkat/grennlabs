import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { LabSession, LabSessionSchema } from './lab-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LabSession.name, schema: LabSessionSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET || 'dev_secret' }),
  ],
  providers: [LabService],
  controllers: [LabController],
  exports: [LabService],
})
export class LabModule {}
