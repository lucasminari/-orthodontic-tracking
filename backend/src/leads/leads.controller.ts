import { Controller, Get, Param } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('unit/:unitId')
  async getLeadsByUnit(@Param('unitId') unitId: string) {
    return await this.leadsService.getLeadsByUnit(unitId);
  }

  @Get(':leadId')
  async getLeadDetails(@Param('leadId') leadId: string) {
    return await this.leadsService.getLeadDetails(leadId);
  }

  @Get()
  async getTodayLeads() {
    return await this.leadsService.getTodayLeads();
  }
}
