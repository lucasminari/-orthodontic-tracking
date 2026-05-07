import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttentionItem, AttentionReason, AttentionStatus, Lead } from '../database/entities';

const FRUSTRATION_WORDS = [
  'nunca', 'impossível', 'não funciona', 'problema', 'erro',
  'irritado', 'chato', 'cansado', 'dificuldade', 'não entendi',
];

@Injectable()
export class AttentionService {
  private readonly logger = new Logger(AttentionService.name);

  constructor(
    @InjectRepository(AttentionItem)
    private readonly attentionRepository: Repository<AttentionItem>,
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async getPendingItems(unitId: string) {
    return await this.attentionRepository.find({
      where: {
        unitId,
        status: AttentionStatus.PENDING,
      },
      relations: ['lead'],
      order: { createdAt: 'ASC' },
    });
  }

  async getAttentionItems(unitId: string, status?: AttentionStatus) {
    const query = this.attentionRepository.createQueryBuilder('item')
      .leftJoinAndSelect('item.lead', 'lead')
      .where('item.unitId = :unitId', { unitId });

    if (status) {
      query.andWhere('item.status = :status', { status });
    }

    return await query.orderBy('item.createdAt', 'DESC').getMany();
  }

  async createAttentionItem(leadId: string, unitId: string, reason: AttentionReason) {
    const lead = await this.leadRepository.findOne({ where: { id: leadId } });

    if (!lead) {
      this.logger.error(`Lead not found: ${leadId}`);
      return null;
    }

    const item = this.attentionRepository.create({
      lead,
      unitId,
      reason,
      status: AttentionStatus.PENDING,
      description: this.getReasonDescription(reason),
    });

    return await this.attentionRepository.save(item);
  }

  async resolveItem(itemId: string, resolvedBy: string) {
    return await this.attentionRepository.update(itemId, {
      status: AttentionStatus.RESOLVED,
      resolvedAt: new Date(),
      resolvedBy,
    });
  }

  async dismissItem(itemId: string) {
    return await this.attentionRepository.update(itemId, {
      status: AttentionStatus.DISMISSED,
    });
  }

  async detectFrustrationWords(text: string): Promise<boolean> {
    const lowerText = text.toLowerCase();
    return FRUSTRATION_WORDS.some((word) => lowerText.includes(word));
  }

  private getReasonDescription(reason: AttentionReason): string {
    const descriptions = {
      [AttentionReason.AI_TIMEOUT]: 'IA não respondeu no tempo esperado',
      [AttentionReason.FRUSTRATION_WORDS]: 'Palavras de frustração detectadas',
      [AttentionReason.HUMAN_REQUEST]: 'Cliente pediu para falar com humano',
      [AttentionReason.MESSAGE_REPETITION]: 'Mensagens repetidas detectadas',
      [AttentionReason.MANUAL]: 'Item criado manualmente',
    };
    return descriptions[reason] || 'Necessário atendimento';
  }
}
