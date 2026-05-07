import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead, Conversation, StageTransition } from '../database/entities';

@Injectable()
export class KommoService {
  private readonly logger = new Logger(KommoService.name);
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly accountId: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(StageTransition)
    private readonly stageTransitionRepository: Repository<StageTransition>,
  ) {
    this.baseUrl = this.configService.get<string>('KOMMO_API_BASE_URL') || '';
    this.token = this.configService.get<string>('KOMMO_API_TOKEN') || '';
    this.accountId = this.configService.get<string>('KOMMO_ACCOUNT_ID') || '';
  }

  async getLead(leadId: number) {
    try {
      this.logger.log(`Fetching lead: ${leadId}`);
      // TODO: implementar chamada real à API do Kommo
      return null;
    } catch (error) {
      this.logger.error(`Error fetching lead: ${error.message}`);
      throw error;
    }
  }

  async getConversations(leadId: number) {
    try {
      this.logger.log(`Fetching conversations for lead: ${leadId}`);
      // TODO: implementar chamada real à API do Kommo
      return [];
    } catch (error) {
      this.logger.error(`Error fetching conversations: ${error.message}`);
      throw error;
    }
  }

  async handleWebhook(payload: any) {
    try {
      this.logger.log(`Processing webhook from Kommo`);
      // TODO: implementar processamento de webhook
      return { success: true };
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`);
      throw error;
    }
  }
}
