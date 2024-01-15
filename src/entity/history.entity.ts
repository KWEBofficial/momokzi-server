import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './user.entity';
import { BaseTime } from './baseTime.entity';

@Entity()
export default class History extends BaseTime {
  // BaseTime을 종속ㅎ여 생성,삭제 시간 기록
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    default: '장소',
  })
  placeId!: string;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;
}
