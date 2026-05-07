import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Lead } from './lead.entity';
import { User } from './user.entity';

@Entity('tracking_units')
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  kommoFunnelId: string;

  @Column({ nullable: true })
  kommoLeadSourceId: string;

  @Column({ nullable: true })
  whatsappPhoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Lead, (lead) => lead.unit)
  leads: Lead[];

  @OneToMany(() => User, (user) => user.unit)
  users: User[];
}
