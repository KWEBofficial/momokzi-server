import Place from '../../entity/place.entity';
import { DeepPartial } from 'typeorm';
import User from '../../entity/user.entity';

interface Bookmark {
  user?: DeepPartial<User>;
  placeid?: number;
}

export default interface GetBookmarkList {
  bookmarkList: Array<Bookmark>;
}
