import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// 예시 entity입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

@Entity()
export default class Place extends BaseEntity {
  // BaseTime을 종속ㅎ여 생성,삭제 시간 기록
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', nullable: false })
  placeId!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  star!: string;

  @Column()
  review!: number;

  @Column()
  address!: string;

  @Column()
  now_working!: string;

  @Column()
  working_time!: string;
}
