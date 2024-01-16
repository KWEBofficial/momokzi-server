import { CreateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseTime {
  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
