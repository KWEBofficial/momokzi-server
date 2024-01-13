import GetUser from '../user/getUser';

export default interface GetHistory {
  id?: number;
  user: GetUser;
  placeId: string;
}
