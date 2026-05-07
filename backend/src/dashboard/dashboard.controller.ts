import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('units/:unitId')
  async getMetrics(@Param('unitId') unitId: string) {
    return await this.dashboardService.getDashboardMetrics(unitId);
  }

  @Get('units/:unitId/funnel')
  async getFunnelMetrics(@Param('unitId') unitId: string) {
    return await this.dashboardService.getFunnelMetrics(unitId);
  }

  @Get()
  async getGlobalMetrics() {
    return await this.dashboardService.getAllDashboardMetrics();
  }
}
