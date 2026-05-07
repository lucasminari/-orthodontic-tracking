import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead, Conversation, StageTransition } from '../database/entities';
import { KommoService } from './kommo.service';
import { KommoController } from './kommo.controller';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Lead, Conversation, StageTransition])],
  providers: [KommoService],
  controllers: [KommoController],
  exports: [KommoService],
})
export class KommoModule {}
