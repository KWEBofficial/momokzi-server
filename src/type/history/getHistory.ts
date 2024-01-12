import User from '../../entity/user.entity';

export default interface GetHistory {
  id?: number;
  user: User;
  placeId: string;
}
