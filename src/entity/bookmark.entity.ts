import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './user.entity';
import { BaseTime } from './baseTime.entity';
import PlaceRes from '../type/place/placeRes';
import Place from './place.entity';

@Entity()
export default class Bookmark extends BaseTime {
  // BaseTime을 종속ㅎ여 생성,삭제 시간 기록
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @ManyToOne(() => Place, (place) => place.id)
  place!: Place;
}
