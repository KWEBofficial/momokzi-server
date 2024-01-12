import User from '../../entity/user.entity';

export default interface SaveBookmark {
  user: User;
  placeId: string;
}
