import Place from '../../entity/place.entity';
import GetUser from '../user/getUser';

export default interface GetBookmark {
  id?: number;
  user: GetUser;
  place: Place;}
