import PlaceRes from '../place/placeRes';
import { DeepPartial } from 'typeorm';
import User from '../../entity/user.entity';
import Place from '../../entity/place.entity';

interface History {
  user?: DeepPartial<User>;
  placeid?: number;
}

export default interface GetHistoryList {
  historyList: Array<History>;
}
