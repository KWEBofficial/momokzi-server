import PlaceRes from '../place/placeRes';
import { DeepPartial } from 'typeorm';
import User from '../../entity/user.entity';
import Place from '../../entity/place.entity';

interface History {
  user?: DeepPartial<User>;
  place?: DeepPartial<Place>;
}

export default interface GetHistoryList {
  historyList: Array<History>;
}
