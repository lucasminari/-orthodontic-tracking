import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { Lead } from './lead.entity';

export enum AttentionReason {
  AI_TIMEOUT = 'ai_timeout',
  FRUSTRATION_WORDS = 'frustration_words',
  HUMAN_REQUEST = 'human_request',
  MESSAGE_REPETITION = 'message_repetition',
  MANUAL = 'manual',
}

export enum AttentionStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed',
}

@Entity('tracking_attention_items')
@Index('idx_status_createdat', (item: AttentionItem) => [item.status, item.createdAt])
@Index('idx_unitid_status', (item: AttentionItem) => [item.unitId, item.status])
export class AttentionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  unitId: string;

  @Column({ type: 'varchar' })
  reason: AttentionReason;

  @Column({ type: 'varchar', default: AttentionStatus.PENDING })
  status: AttentionStatus;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  resolvedAt: Date;

  @Column({ nullable: true })
  resolvedBy: string;

  @Column({ type: 'text', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Lead, (lead) => lead.attentionItems, { onDelete: 'CASCADE' })
  lead: Lead;
}
