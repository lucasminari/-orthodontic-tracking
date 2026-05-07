import { Injectable } from '@nestjs/common';
import { Repository, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead, Unit, AttentionItem, AttentionStatus } from '../database/entities';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
    @InjectRepository(AttentionItem)
    private readonly attentionRepository: Repository<AttentionItem>,
  ) {}

  async getAllDashboardMetrics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalLeads, pendingAttentionItems, allLeads] = await Promise.all([
      this.leadRepository.count(),
      this.attentionRepository.count({
        where: { status: AttentionStatus.PENDING },
      }),
      this.leadRepository.find(),
    ]);

    // Calculate active leads (last message in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activeLeads = allLeads.filter(
      (lead) => lead.lastMessageAt && new Date(lead.lastMessageAt) > sevenDaysAgo
    ).length;

    // Mock metrics (in production, these would be calculated from real data)
    const conversionRate = totalLeads > 0 ? Math.round((activeLeads / totalLeads) * 100) : 0;
    const avgResponseTime = 45; // seconds
    const satisfactionRate = 92; // percentage

    // Get funnel data
    const funnel = await this.getFunnelMetrics();

    return {
      totalLeads,
      activeLeads,
      conversionRate,
      pendingAttention: pendingAttentionItems,
      avgResponseTime,
      satisfactionRate,
      funnel,
    };
  }

  async getDashboardMetrics(unitId: string) {
    const [totalLeads, pendingAttentionItems, leads] = await Promise.all([
      this.leadRepository.count({ where: { unit: { id: unitId } } }),
      this.attentionRepository.count({
        where: { unitId, status: AttentionStatus.PENDING },
      }),
      this.leadRepository.find({ where: { unit: { id: unitId } } }),
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activeLeads = leads.filter(
      (lead) => lead.lastMessageAt && new Date(lead.lastMessageAt) > sevenDaysAgo
    ).length;

    const conversionRate = totalLeads > 0 ? Math.round((activeLeads / totalLeads) * 100) : 0;

    return {
      totalLeads,
      activeLeads,
      conversionRate,
      pendingAttention: pendingAttentionItems,
      avgResponseTime: 45,
      satisfactionRate: 92,
    };
  }

  async getUnitsOverview() {
    const units = await this.unitRepository.find();
    const metricsPromises = units.map((unit) => this.getDashboardMetrics(unit.id));
    const metrics = await Promise.all(metricsPromises);

    return units.map((unit, index) => ({
      ...unit,
      metrics: metrics[index],
    }));
  }

  async getFunnelMetrics(unitId?: string) {
    let query = this.leadRepository
      .createQueryBuilder('lead')
      .select('lead.stage', 'stage')
      .addSelect('COUNT(*)', 'count');

    if (unitId) {
      query = query.where('lead.unit.id = :unitId', { unitId });
    }

    const stages = await query.groupBy('lead.stage').getRawMany();

    // Convert to frontend format and calculate percentages
    const total = stages.reduce((sum, stage) => sum + parseInt(stage.count, 10), 0);

    return stages.map((stage) => ({
      stage: stage.stage || 'Sem estágio',
      count: parseInt(stage.count, 10),
      percentage: total > 0 ? Math.round((parseInt(stage.count, 10) / total) * 100) : 0,
    }));
  }
}
