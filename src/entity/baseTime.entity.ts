import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTime {
  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
