import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

// 예시 entity입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

@Entity()
@Unique(['username']) //중복 방지
export default class User extends BaseEntity {
  // BaseTime을 종속ㅎ여 생성,삭제 시간 기록
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
    comment: '아이디',
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
    comment: '비밀번호',
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '닉네임',
  })
  nickname!: string;

  @Column()
  age!: number;

  @Column()
  gender!: 'M' | 'F';
}
