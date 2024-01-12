import User from '../../entity/user.entity';

export default interface GetBookmark {
  id?: number;
  user: User;
  placeId: string;
}
