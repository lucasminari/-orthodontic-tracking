import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { Unit } from './unit.entity';
import { Conversation } from './conversation.entity';
import { StageTransition } from './stage-transition.entity';
import { AttentionItem } from './attention-item.entity';

@Entity('tracking_leads')
@Index(['kommoLeadId', 'unit'], { unique: true })
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  kommoLeadId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  stage: string;

  @Column({ nullable: true })
  lastMessageAt: Date;

  @Column({ nullable: true })
  lastMessageContent: string;

  @Column({ type: 'text', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Unit, (unit) => unit.leads, { onDelete: 'CASCADE' })
  unit: Unit;

  @OneToMany(() => Conversation, (conversation) => conversation.lead)
  conversations: Conversation[];

  @OneToMany(() => StageTransition, (transition) => transition.lead)
  stageTransitions: StageTransition[];

  @OneToMany(() => AttentionItem, (item) => item.lead)
  attentionItems: AttentionItem[];
}
