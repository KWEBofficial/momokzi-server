import GetUser from '../user/getUser';

export default interface SaveBookmark {
  user: GetUser;
  placeId: string;
}