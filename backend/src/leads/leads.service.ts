import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead, Unit } from '../database/entities';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async getLeadsByUnit(unitId: string) {
    return await this.leadRepository.find({
      where: { unit: { id: unitId } },
      relations: ['unit', 'conversations'],
      order: { lastMessageAt: 'DESC' },
    });
  }

  async getLeadDetails(leadId: string) {
    return await this.leadRepository.findOne({
      where: { id: leadId },
      relations: ['unit', 'conversations', 'stageTransitions', 'attentionItems'],
    });
  }

  async getTodayLeads() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.leadRepository
      .createQueryBuilder('lead')
      .where('lead.createdAt >= :today', { today })
      .orderBy('lead.createdAt', 'DESC')
      .getMany();
  }
}
