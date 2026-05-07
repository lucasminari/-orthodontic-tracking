import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { AttentionService } from './attention.service';
import { AttentionStatus, AttentionReason } from '../database/entities';

@Controller('attention')
export class AttentionController {
  constructor(private readonly attentionService: AttentionService) {}

  @Get('units/:unitId/pending')
  async getPendingItems(@Param('unitId') unitId: string) {
    return await this.attentionService.getPendingItems(unitId);
  }

  @Get('units/:unitId')
  async getAttentionItems(
    @Param('unitId') unitId: string,
    @Query('status') status?: AttentionStatus,
  ) {
    return await this.attentionService.getAttentionItems(unitId, status);
  }

  @Post()
  async createAttentionItem(
    @Body() body: { leadId: string; unitId: string; reason: AttentionReason },
  ) {
    return await this.attentionService.createAttentionItem(
      body.leadId,
      body.unitId,
      body.reason,
    );
  }

  @Patch(':itemId/resolve')
  async resolveItem(
    @Param('itemId') itemId: string,
    @Body() body: { resolvedBy: string },
  ) {
    return await this.attentionService.resolveItem(itemId, body.resolvedBy);
  }

  @Patch(':itemId/dismiss')
  async dismissItem(@Param('itemId') itemId: string) {
    return await this.attentionService.dismissItem(itemId);
  }
}
