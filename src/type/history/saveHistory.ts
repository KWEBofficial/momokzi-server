import User from '../../entity/user.entity';

export default interface SaveHistory {
  user: User;
  placeId: string;
}
