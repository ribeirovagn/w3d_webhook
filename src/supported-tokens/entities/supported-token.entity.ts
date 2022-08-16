import { Webhook } from 'src/webhook/entities/webhook.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'supported-tokens' })
export class SupportedToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  symbol: string;

  @Column({ unique: true, nullable: true })
  address: string;

  @Column({ nullable: true })
  decimals: number;

  @OneToMany(() => Webhook, (webhook) => webhook.token)
  webhook: Webhook;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
