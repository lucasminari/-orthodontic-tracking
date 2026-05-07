import { Controller, Post, Body, Param, Get, BadRequestException } from '@nestjs/common';
import { KommoService } from './kommo.service';

@Controller('kommo')
export class KommoController {
  constructor(private readonly kommoService: KommoService) {}

  @Get('leads/:leadId')
  async getLead(@Param('leadId') leadId: string) {
    return await this.kommoService.getLead(parseInt(leadId, 10));
  }

  @Get('leads/:leadId/conversations')
  async getConversations(@Param('leadId') leadId: string) {
    return await this.kommoService.getConversations(parseInt(leadId, 10));
  }

  @Post('webhooks')
  async handleWebhook(@Body() payload: any) {
    if (!payload) {
      throw new BadRequestException('Webhook payload is required');
    }
    return await this.kommoService.handleWebhook(payload);
  }
}
