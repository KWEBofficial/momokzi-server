import { DeepPartial } from 'typeorm';
import GetUser from '../user/getUser';
import Place from '../../entity/place.entity';
import User from '../../entity/user.entity';

export default interface SaveBookmark {
  id?: number;
  user?: DeepPartial<User>;
  place?: DeepPartial<Place>;
}
