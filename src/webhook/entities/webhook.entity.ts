import { SupportedToken } from 'src/supported-tokens/entities/supported-token.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'webhooks' })
export class Webhook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @ManyToOne(
    () => SupportedToken,
    (supportedToken: SupportedToken) => supportedToken.webhook,
  )
  token: SupportedToken;

  @Column()
  address: string;

  @Column()
  url: string;

  @Column({ name: 'num_confirmations' })
  numConfirmations: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
