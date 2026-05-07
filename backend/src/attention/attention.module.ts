import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttentionItem, Lead } from '../database/entities';
import { AttentionService } from './attention.service';
import { AttentionController } from './attention.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AttentionItem, Lead])],
  providers: [AttentionService],
  controllers: [AttentionController],
  exports: [AttentionService],
})
export class AttentionModule {}
