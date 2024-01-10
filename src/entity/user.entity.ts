import {
  Column,
//  CreateDateColumn,
//  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
//  UpdateDateColumn,
} from 'typeorm';

// 예시 entity입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
    comment: '아이디'
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '비밀번호',
  })
  password!: string;

  /*
  @Column({ nullable: true })
  age?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
  */
}
