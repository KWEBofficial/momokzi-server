import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

enum Gender {
  MALE = '남성',
  FEMALE = '여성',
  OTHER = '기타',
}

@Entity()
@Unique(["username"])
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
    length: 512,
    nullable: false,
    comment: '비밀번호',
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.OTHER,
  })
  gender!: Gender;

  @Column()
  nickname!: string;

}
