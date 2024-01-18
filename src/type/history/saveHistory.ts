import { DeepPartial } from 'typeorm';
import GetUser from '../user/getUser';
import User from '../../entity/user.entity';
import Place from '../../entity/place.entity';

export default interface SaveHistory {
  id?: number;
  user: DeepPartial<User>;
  placeKey: DeepPartial<Place>;
}
