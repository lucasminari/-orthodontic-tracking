import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Index } from 'typeorm';
import { Lead } from './lead.entity';

@Entity('tracking_stage_transitions')
@Index('idx_kommo_transitioned', (st: StageTransition) => [st.kommoLeadId, st.transitionedAt])
export class StageTransition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  kommoLeadId: number;

  @Column()
  fromStage: string;

  @Column()
  toStage: string;

  @Column()
  transitionedAt: Date;

  @Column({ type: 'text', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Lead, (lead) => lead.stageTransitions, { onDelete: 'CASCADE' })
  lead: Lead;
}
