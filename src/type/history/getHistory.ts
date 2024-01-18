import Place from '../../entity/place.entity';
import PlaceRes from '../place/placeRes';
import GetUser from '../user/getUser';

export default interface GetHistory {
  id?: number;
  user: GetUser;
  place: PlaceRes;
}
