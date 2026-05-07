import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { Lead } from './lead.entity';

export enum ConversationSource {
  WHATSAPP = 'whatsapp',
  SMS = 'sms',
  PHONE = 'phone',
  EMAIL = 'email',
}

export enum ConversationRole {
  HUMAN = 'human',
  AI = 'ai',
}

@Entity('tracking_conversations')
@Index(['kommoMessageId'], { unique: true })
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  kommoMessageId: number;

  @Column({ type: 'varchar' })
  source: ConversationSource;

  @Column({ type: 'varchar' })
  role: ConversationRole;

  @Column()
  content: string;

  @Column({ nullable: true })
  sentAt: Date;

  @Column({ type: 'text', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Lead, (lead) => lead.conversations, { onDelete: 'CASCADE' })
  lead: Lead;
}
